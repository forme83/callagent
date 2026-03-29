import { Body, Controller, Post } from '@nestjs/common';
import { CallsService, CallStatus, CallDirection } from './calls.service';
import { ScenarioService } from './scenario.service';
import { TelnyxService } from './telnyx.service';
import { StreamingSttService } from './streaming-stt.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly callsService: CallsService,
    private readonly scenarioService: ScenarioService,
    private readonly telnyxService: TelnyxService,
    private readonly streamingSttService: StreamingSttService,
  ) {}

  @Post('telnyx')
  async telnyxWebhook(@Body() body: any) {
    console.log('TELNYX WEBHOOK BODY:', JSON.stringify(body));

    const eventType = body?.data?.event_type;
    const payload = body?.data?.payload;
    const callControlId = payload?.call_control_id;
    const direction = payload?.direction as CallDirection | undefined;
    const from = payload?.from;
    const to = payload?.to;

    let status: CallStatus | null = null;

    if (eventType === 'call.initiated') status = 'initiated';
    if (eventType === 'call.answered') status = 'answered';
    if (eventType === 'call.hangup') status = 'hangup';

    if (callControlId && eventType === 'call.initiated' && direction === 'outgoing' && to) {
      const pendingMode = this.callsService.consumeNextOutboundMode(to);

      if (pendingMode) {
        this.callsService.setCallMode(callControlId, pendingMode);
        console.log('OUTBOUND MODE ATTACHED:', {
          callControlId,
          to,
          mode: pendingMode,
        });
      }
    }

    if (callControlId && status) {
      const existing = this.callsService.findAll().find((c) => c.id === callControlId);

      this.callsService.upsertCall({
        id: callControlId,
        from: from ?? existing?.from ?? '',
        to: to ?? existing?.to ?? '',
        direction: direction ?? existing?.direction ?? 'incoming',
        status,
      });
    }

    try {
      if (eventType === 'call.initiated' && direction === 'incoming' && callControlId) {
        await this.telnyxService.answerCall(callControlId);
      }

      if (eventType === 'call.answered' && callControlId) {
        const answeredAt = new Date().toISOString();
        console.log('CALL ANSWERED HANDLER:', {
          callControlId,
          answeredAt,
          from,
          to,
          direction,
        });

        await this.telnyxService.startStreaming(callControlId);

        const mode = this.callsService.getCallMode(callControlId);

        if (mode === 'ai') {
          await this.telnyxService.startPlayback(
            callControlId,
            'https://calls.mycallsagent.agency/audio/beep-start.wav',
          );
        }

        console.log('CALL ANSWERED MODE:', {
          callControlId,
          mode,
          answeredAt,
        });

        if (mode === 'scenario') {
          await this.scenarioService.startScenario(callControlId);
        }

        if (mode === 'ai') {
          console.log('AI MODE ACTIVE: scenario skipped', { callControlId });
        }
      }

      if (eventType === 'call.speak.started' && callControlId) {
        const mode = this.callsService.getCallMode(callControlId);

        if (mode === 'ai') {
          this.streamingSttService.markBotSpeaking(callControlId);
        }
      }

      if (eventType === 'call.speak.ended' && callControlId) {
        const mode = this.callsService.getCallMode(callControlId);

        if (mode === 'ai') {
          this.streamingSttService.markBotStopped(callControlId);
        }

        if (mode === 'scenario') {
          await this.scenarioService.continueScenario(callControlId);
        }
      }
    } catch (err) {
      console.error('TELNYX ERROR:', err);
    }

    return { ok: true };
  }
}