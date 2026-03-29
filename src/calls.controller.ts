import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import fetch from 'node-fetch';
import { CallsService } from './calls.service';
import { AiService } from './ai.service';

@Controller('calls')
export class CallsController {
  constructor(
    private readonly callsService: CallsService,
    private readonly aiService: AiService,
  ) {}

  @Get()
  getCalls() {
    return this.callsService.findAll();
  }

  @Get(':id/messages')
  getMessages(@Param('id') id: string) {
    return this.callsService.getMessagesByCallId(id);
  }

  @Post('outbound')
  async createOutboundCall(@Body() body: { to: string }) {
    const to = body.to;
    const from = '+34960291053';
    const apiKey = process.env.TELNYX_API_KEY;

    const response = await fetch('https://api.telnyx.com/v2/calls', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        connection_id: process.env.TELNYX_CONNECTION_ID,
        to,
        from,
      }),
    });

    const data = await response.json();
    return data;
  }

  @Post('outbound-ai')
  async createAiOutboundCall(@Body() body: { to: string }) {
    const to = body?.to?.trim();
    const from = '+34960291053';
    const apiKey = process.env.TELNYX_API_KEY;

    if (!to) {
      return {
        success: false,
        error: 'to is required',
      };
    }

    this.callsService.markNextOutboundMode(to, 'ai');

    const response = await fetch('https://api.telnyx.com/v2/calls', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        connection_id: process.env.TELNYX_CONNECTION_ID,
        to,
        from,
      }),
    });

    const data = await response.json();
    return data;
  }

  @Post(':id/hangup')
  async hangup(@Param('id') callId: string) {
    const apiKey = process.env.TELNYX_API_KEY;

    const response = await fetch(
      `https://api.telnyx.com/v2/calls/${callId}/actions/hangup`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const responseText = await response.text();

    console.log('HANGUP STATUS:', response.status);
    console.log('HANGUP BODY:', responseText);

    return {
      success: response.ok,
      callId,
      telnyxStatus: response.status,
      telnyxBody: responseText,
    };
  }

  @Post(':id/speak')
  async speak(
    @Param('id') callId: string,
    @Body() body: { text: string },
  ) {
    const textRu = body?.text?.trim();

    if (!textRu) {
      return {
        success: false,
        error: 'text is required',
      };
    }

    const textEs = await this.aiService.translateRuToEs(textRu);

    this.callsService.setCallMode(callId, 'operator');

    const message = this.callsService.addMessage({
      callId,
      role: 'operator',
      textEs,
      textRu,
    });

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
          payload: textEs,
          voice: 'AWS.Polly.Lucia',
        }),
      },
    );

    const responseText = await response.text();

    console.log('OPERATOR SPEAK STATUS:', response.status);
    console.log('OPERATOR SPEAK BODY:', responseText);

    return {
      success: response.ok,
      callId,
      textRu,
      textEs,
      message,
      telnyxStatus: response.status,
      telnyxBody: responseText,
    };
  }
}
