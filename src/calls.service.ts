import { Injectable } from '@nestjs/common';

export type CallStatus = 'initiated' | 'answered' | 'hangup';
export type CallDirection = 'incoming' | 'outgoing';
export type CallMessageRole = 'bot' | 'human' | 'operator' | 'system';
export type CallMode = 'scenario' | 'operator' | 'ai';

export interface Call {
  id: string; // call_control_id
  from: string;
  to: string;
  direction: CallDirection;
  status: CallStatus;
}

export interface CallScenarioState {
  scenarioId: string;
  currentStepIndex: number;
}

export interface CallMessage {
  id: string;
  callId: string;
  role: CallMessageRole;
  textEs: string;
  textRu: string;
  timestamp: string;
}

@Injectable()
export class CallsService {
  private calls: Call[] = [];
  private scenarioStates: Record<string, CallScenarioState> = {};
  private messages: CallMessage[] = [];
  private callModes: Record<string, CallMode> = {};
  private pendingOutboundModes: Record<string, CallMode[]> = {};

  findAll(): Call[] {
    return this.calls;
  }

  upsertCall(call: Call) {
    const existing = this.calls.find(c => c.id === call.id);

    if (existing) {
      existing.status = call.status;
      existing.from = call.from;
      existing.to = call.to;
      existing.direction = call.direction;
      return existing;
    }

    this.calls.push(call);
    return call;
  }

  setScenarioState(callId: string, state: CallScenarioState) {
    this.scenarioStates[callId] = state;
    return state;
  }

  getScenarioState(callId: string): CallScenarioState | undefined {
    return this.scenarioStates[callId];
  }

  clearScenarioState(callId: string) {
    delete this.scenarioStates[callId];
  }

  setCallMode(callId: string, mode: CallMode) {
    this.callModes[callId] = mode;
    return mode;
  }

  getCallMode(callId: string): CallMode {
    return this.callModes[callId] ?? 'scenario';
  }

  clearCallMode(callId: string) {
    delete this.callModes[callId];
  }

  markNextOutboundMode(to: string, mode: CallMode) {
    const normalizedTo = to.trim();

    if (!normalizedTo) {
      return;
    }

    if (!this.pendingOutboundModes[normalizedTo]) {
      this.pendingOutboundModes[normalizedTo] = [];
    }

    this.pendingOutboundModes[normalizedTo].push(mode);
  }

  consumeNextOutboundMode(to: string): CallMode | undefined {
    const normalizedTo = to.trim();

    if (!normalizedTo) {
      return undefined;
    }

    const queue = this.pendingOutboundModes[normalizedTo];

    if (!queue || queue.length === 0) {
      return undefined;
    }

    const mode = queue.shift();

    if (queue.length === 0) {
      delete this.pendingOutboundModes[normalizedTo];
    }

    return mode;
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/[.,!?]+$/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getLastHumanMessage(callId: string): CallMessage | undefined {
    const messages = this.messages
      .filter(m => m.callId === callId && m.role === 'human');

    return messages[messages.length - 1];
  }

  addMessage(message: Omit<CallMessage, 'id' | 'timestamp'>) {
    if (message.role === 'human') {
      const current = this.normalize(message.textEs);

      const last = this.getLastHumanMessage(message.callId);

      if (last) {
        const prev = this.normalize(last.textEs);

        if (current === prev) {
          return;
        }

        if (prev.includes(current)) {
          return;
        }
      }
    }

    const newMessage: CallMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      ...message,
    };

    this.messages.push(newMessage);
    return newMessage;
  }

  getMessagesByCallId(callId: string): CallMessage[] {
    return this.messages.filter(message => message.callId === callId);
  }
}
