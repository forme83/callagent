import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class TelnyxService {
  async answerCall(callControlId: string): Promise<void> {
    const apiKey = process.env.TELNYX_API_KEY;

    if (!apiKey) {
      console.error('TELNYX_API_KEY not set');
      return;
    }

    console.log('TELNYX ANSWER REQUEST:', {
      callControlId,
      at: new Date().toISOString(),
    });

    const response = await fetch(
      `https://api.telnyx.com/v2/calls/${callControlId}/actions/answer`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const text = await response.text();
    console.log('ANSWER STATUS:', response.status);
    console.log('ANSWER BODY:', text);
  }

  async startStreaming(callControlId: string): Promise<void> {
    const apiKey = process.env.TELNYX_API_KEY;
    const streamUrl = 'wss://calls.mycallsagent.agency/api/telnyx-stream';

    if (!apiKey) {
      console.error('TELNYX_API_KEY not set');
      return;
    }

    console.log('TELNYX STREAMING_START REQUEST:', {
      callControlId,
      at: new Date().toISOString(),
      streamUrl,
    });

    const response = await fetch(
      `https://api.telnyx.com/v2/calls/${callControlId}/actions/streaming_start`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stream_url: streamUrl,
          stream_track: 'both_tracks',
        }),
      },
    );

    const text = await response.text();
    console.log('STREAMING START STATUS:', response.status);
    console.log('STREAMING START BODY:', text);
  }

  async startPlayback(callControlId: string, audioUrl: string): Promise<void> {
    const apiKey = process.env.TELNYX_API_KEY;

    if (!apiKey) {
      console.error('TELNYX_API_KEY not set');
      return;
    }

    console.log('TELNYX PLAYBACK_START REQUEST:', {
      callControlId,
      audioUrl,
      at: new Date().toISOString(),
    });

    const response = await fetch(
      `https://api.telnyx.com/v2/calls/${callControlId}/actions/playback_start`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio_url: audioUrl,
        }),
      },
    );

    const text = await response.text();
    console.log('PLAYBACK START STATUS:', response.status);
    console.log('PLAYBACK START BODY:', text);
  }

  async stopSpeak(callControlId: string): Promise<void> {
    const apiKey = process.env.TELNYX_API_KEY;

    if (!apiKey) {
      console.error('TELNYX_API_KEY not set');
      return;
    }

    console.log('TELNYX PLAYBACK_STOP REQUEST:', {
      callControlId,
      at: new Date().toISOString(),
    });

    const response = await fetch(
      `https://api.telnyx.com/v2/calls/${callControlId}/actions/playback_stop`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const text = await response.text();
    console.log('PLAYBACK STOP STATUS:', response.status);
    console.log('PLAYBACK STOP BODY:', text);
  }
}
