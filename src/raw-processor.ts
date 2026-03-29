import { readFileSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { AiService } from './ai.service';
import { CallsService } from './calls.service';
import { AiOperatorService } from './ai-operator.service';

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[¿?¡!.,:;]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getPostProcessEchoReason(
  callsService: CallsService,
  callControlId: string,
  transcriptText: string,
): string | null {
  const normalizedTranscript = normalizeText(transcriptText);

  if (!normalizedTranscript) {
    return null;
  }

  const messages = callsService.getMessagesByCallId(callControlId);
  const lastBotMessage = [...messages].reverse().find(message => message.role === 'bot');

  if (!lastBotMessage?.textEs) {
    return null;
  }

  const normalizedBotText = normalizeText(lastBotMessage.textEs);

  if (!normalizedBotText) {
    return null;
  }

  if (normalizedTranscript === normalizedBotText) {
    return 'exact_match_last_bot_message';
  }

  if (
    normalizedTranscript.length >= 6 &&
    normalizedBotText.includes(normalizedTranscript)
  ) {
    return 'transcript_inside_last_bot_message';
  }

  if (
    normalizedBotText.length >= 6 &&
    normalizedTranscript.includes(normalizedBotText)
  ) {
    return 'last_bot_message_inside_transcript';
  }

  return null;
}

export async function processRawAudio(
  rawPath: string,
  wavPath: string,
  callControlId: string,
  aiService: AiService,
  callsService: CallsService,
  aiOperatorService: AiOperatorService,
  allowAiReply: boolean,
) {
  const data = readFileSync(rawPath);

  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(6, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(8000, 24);
  header.writeUInt32LE(8000, 28);
  header.writeUInt16LE(1, 32);
  header.writeUInt16LE(8, 34);
  header.write('data', 36);
  header.writeUInt32LE(data.length, 40);

  writeFileSync(wavPath, Buffer.concat([header, data]));

  console.log('WAV CREATED:', wavPath);

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OPENAI_API_KEY not set');
    return;
  }

  const form = new FormData();
  form.append('file', readFileSync(wavPath), {
    filename: 'audio.wav',
    contentType: 'audio/wav',
  });
  form.append('model', 'gpt-4o-transcribe');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...form.getHeaders(),
    },
    body: form as any,
  });

  const result = await response.json();
  const transcriptText = result?.text ?? '';

  console.log('TRANSCRIBE STATUS:', response.status);
  console.log('TRANSCRIBE TEXT:', transcriptText);

  if (transcriptText) {
    const translatedText = await aiService.translateEsToRu(transcriptText);

    console.log('TRANSLATE ES->RU:', translatedText);

    if (callControlId) {
      const echoReason = getPostProcessEchoReason(
        callsService,
        callControlId,
        transcriptText,
      );

      if (echoReason) {
        console.log('POST PROCESS HUMAN IGNORED: echo detected', {
          callControlId,
          transcriptText,
          echoReason,
        });
        return;
      }

      callsService.addMessage({
        callId: callControlId,
        role: 'human',
        textEs: transcriptText,
        textRu: translatedText,
      });

      console.log('CALL MESSAGE SAVED:', callControlId);

      const mode = callsService.getCallMode(callControlId);

      if (mode === 'ai' && allowAiReply) {
        console.log('AI MODE: handling human message', { callControlId });

        await aiOperatorService.handleHumanMessage(callControlId);
      }
    }
  }
}
