import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CallsService } from './calls.service';
import { AiService } from './ai.service';

@Injectable()
export class AiOperatorService {
  constructor(
    private readonly callsService: CallsService,
    private readonly aiService: AiService,
  ) {}

  async handleHumanMessage(callId: string) {
    const messages = this.callsService.getMessagesByCallId(callId);

    if (!messages || messages.length === 0) {
      return;
    }

    const replyEs = await this.aiService.generateOperatorReply(messages);

    if (!replyEs) {
      return;
    }

    const apiKey = process.env.TELNYX_API_KEY;

    const response = await fetch(
      `https://api.telnyx.com/v2/calls/${callId}/actions/speak`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: replyEs,
          voice: 'AWS.Polly.Lucia',
        }),
      },
    );

    const responseText = await response.text();

    console.log('AI SPEAK RESPONSE:', {
      status: response.status,
      body: responseText,
    });

    this.callsService.addMessage({
      callId,
      role: 'bot',
      textEs: replyEs,
      textRu: '',
    });

    console.log('AI RESPONSE SENT:', {
      callId,
      replyEs,
    });
  }
}
