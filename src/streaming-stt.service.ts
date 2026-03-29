import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import WebSocket from 'ws';
import { CallsService } from './calls.service';
import { AiOperatorService } from './ai-operator.service';
import { TelnyxService } from './telnyx.service';

type SttConnectionState = 'idle' | 'opening' | 'open' | 'closed' | 'error';

interface RealtimeServerEvent {
  type?: string;
  delta?: string;
  transcript?: string;
  item_id?: string;
  error?: any;
  session?: any;
}

interface StreamingSessionState {
  totalBytes: number;
  chunkCount: number;
  isClosing: boolean;
  startedAt: number;
  lastChunkAt: number;
  ws: WebSocket | null;
  sttConnectionState: SttConnectionState;
  lastPartialText: string;
  lastFinalText: string;
  lastHandledText: string;
  pendingFinalText: string;
  isHandlingTurn: boolean;
  isBotSpeaking: boolean;
  botSpeakingTimeout: NodeJS.Timeout | null;
  wasInterruptedByHuman: boolean;
  interruptInFlight: boolean;
}

@Injectable()
export class StreamingSttService {
  private sessions = new Map<string, StreamingSessionState>();

  constructor(
    private readonly callsService: CallsService,
    private readonly aiOperatorService: AiOperatorService,
    private readonly telnyxService: TelnyxService,
  ) {}

  startSession(callControlId: string) {
    const existing = this.sessions.get(callControlId);

    if (existing) {
      this.closeRealtimeSession(callControlId, existing);
      this.clearBotSpeakingTimeout(existing);
    }

    const session: StreamingSessionState = {
      totalBytes: 0,
      chunkCount: 0,
      isClosing: false,
      startedAt: Date.now(),
      lastChunkAt: 0,
      ws: null,
      sttConnectionState: 'idle',
      lastPartialText: '',
      lastFinalText: '',
      lastHandledText: '',
      pendingFinalText: '',
      isHandlingTurn: false,
      isBotSpeaking: false,
      botSpeakingTimeout: null,
      wasInterruptedByHuman: false,
      interruptInFlight: false,
    };

    this.sessions.set(callControlId, session);

    console.log('STREAMING STT START SESSION:', callControlId);

    this.openRealtimeSession(callControlId, session);
  }

  pushAudio(callControlId: string, chunk: Buffer) {
    const session = this.sessions.get(callControlId);

    if (!session) return;
    if (session.isClosing) return;

    session.totalBytes += chunk.length;
    session.chunkCount += 1;
    session.lastChunkAt = Date.now();

    this.sendAudioChunk(callControlId, session, chunk);
  }

  stopSession(callControlId: string) {
    const session = this.sessions.get(callControlId);

    if (session) {
      session.isClosing = true;

      this.clearBotSpeakingTimeout(session);

      setTimeout(() => {
        this.closeRealtimeSession(callControlId, session);
      }, 300);

      this.sessions.delete(callControlId);
    }
  }

  markBotSpeaking(callControlId: string) {
    const session = this.sessions.get(callControlId);
    if (!session) return;

    this.clearBotSpeakingTimeout(session);
    session.isBotSpeaking = true;
  }

  markBotStopped(callControlId: string) {
    const session = this.sessions.get(callControlId);
    if (!session) return;

    this.clearBotSpeakingTimeout(session);
    session.interruptInFlight = false;
  }

  async forceInterrupt(callControlId: string) {
    const session = this.sessions.get(callControlId);
    if (!session || session.interruptInFlight) return;

    session.interruptInFlight = true;

    try {
      await this.telnyxService.stopSpeak(callControlId);
    } finally {
      this.clearBotSpeakingTimeout(session);
      session.interruptInFlight = false;
    }
  }

  private openRealtimeSession(callControlId: string, session: StreamingSessionState) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return;

    session.sttConnectionState = 'opening';

    const ws = new WebSocket('wss://api.openai.com/v1/realtime?intent=transcription', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    session.ws = ws;

    ws.on('open', () => {
      session.sttConnectionState = 'open';

      ws.send(JSON.stringify({
        type: 'session.update',
        session: {
          type: 'transcription',
          audio: {
            input: {
              format: { type: 'audio/pcma' },
              transcription: {
                model: 'gpt-4o-transcribe',
                language: 'es'
              }
            }
          }
        }
      }));
    });

    ws.on('message', (data) => {
      const parsed = JSON.parse(data.toString());
      this.handleRealtimeMessage(callControlId, session, parsed);
    });
  }

  private sendAudioChunk(callControlId: string, session: StreamingSessionState, chunk: Buffer) {
    if (!session.ws || session.ws.readyState !== WebSocket.OPEN) return;

    session.ws.send(JSON.stringify({
      type: 'input_audio_buffer.append',
      audio: chunk.toString('base64'),
    }));
  }

  private handleRealtimeMessage(callControlId: string, session: StreamingSessionState, event: any) {
    const type = event?.type;

    if (type === 'conversation.item.input_audio_transcription.delta') {
      this.handlePartialTranscript(callControlId, session, event.delta ?? '');
    }

    if (type === 'conversation.item.input_audio_transcription.completed') {
      void this.handleFinalTranscript(callControlId, session, event.transcript ?? '');
    }
  }

  private handlePartialTranscript(callControlId: string, session: StreamingSessionState, text: string) {
    const partial = text.trim();
    if (!partial) return;

    if (session.isBotSpeaking) {
      if (partial.length >= 2 && !this.getEchoReason(callControlId, partial)) {
        void this.forceInterrupt(callControlId);
      }
    }
  }

  private async handleFinalTranscript(callControlId: string, session: StreamingSessionState, text: string) {
    const transcript = text.trim();
    if (!transcript || transcript.length < 2) return;

    if (session.isHandlingTurn) {
      session.pendingFinalText = transcript;
      return;
    }

    session.isHandlingTurn = true;

    try {
      const humanMessage = this.callsService.addMessage({
        callId: callControlId,
        role: 'human',
        textEs: transcript,
        textRu: '',
      });

      if (!humanMessage) return;

      await this.aiOperatorService.handleHumanMessage(callControlId);
    } finally {
      session.isHandlingTurn = false;
    }
  }

  private getEchoReason(callControlId: string, transcript: string): string | null {
    return null;
  }

  private closeRealtimeSession(callControlId: string, session: StreamingSessionState) {
    const ws = session.ws;
    if (!ws) return;

    session.ws = null;
    try { ws.close(); } catch {}
  }

  private clearBotSpeakingTimeout(session: StreamingSessionState) {
    if (session.botSpeakingTimeout) {
      clearTimeout(session.botSpeakingTimeout);
      session.botSpeakingTimeout = null;
    }
    session.isBotSpeaking = false;
  }
}
