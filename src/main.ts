import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WebSocketServer } from 'ws';
import { appendFileSync, mkdirSync } from 'fs';
import { AiService } from './ai.service';
import { CallsService } from './calls.service';
import { AiOperatorService } from './ai-operator.service';
import { StreamingSttService } from './streaming-stt.service';
import { processRawAudio } from './raw-processor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  app.setGlobalPrefix('api');

  const aiService = app.get(AiService);
  const callsService = app.get(CallsService);
  const aiOperatorService = app.get(AiOperatorService);
  const streamingSttService = app.get(StreamingSttService);

  const server = app.getHttpServer();

  const wss = new WebSocketServer({
    server,
    path: '/api/telnyx-stream',
  });

  wss.on('connection', (ws, req) => {
    console.log('WS CONNECTED:', req.url);

    mkdirSync('/opt/callagent/repo/tmp/telnyx-stream', { recursive: true });

    const basePath = `/opt/callagent/repo/tmp/telnyx-stream/${Date.now()}`;
    const rawPath = `${basePath}.raw`;
    const wavPath = `${basePath}.wav`;

    let messageCount = 0;
    let totalBytes = 0;
    let callControlId = '';
    let streamId = '';
    let connectedCount = 0;
    let startCount = 0;
    let mediaCount = 0;
    let stopCount = 0;
    let firstSequenceNumber = '';
    let lastSequenceNumber = '';
    const wsConnectedAt = Date.now();
    let wsStartAt = 0;
    let firstMediaAt = 0;

    ws.on('message', (message) => {
      messageCount += 1;

      const raw = message.toString();

      try {
        const parsed = JSON.parse(raw);
        const eventType = parsed?.event;
        const sequenceNumber = parsed?.sequence_number;

        if (sequenceNumber) {
          if (!firstSequenceNumber) {
            firstSequenceNumber = sequenceNumber;
          }
          lastSequenceNumber = sequenceNumber;
        }

        if (eventType === 'connected') connectedCount += 1;
        if (eventType === 'start') startCount += 1;
        if (eventType === 'media') mediaCount += 1;
        if (eventType === 'stop') stopCount += 1;

        if (eventType !== 'media') console.log('WS EVENT TYPE:', eventType);

        if (eventType === 'connected' || eventType === 'start') {
          console.log('WS CONTROL EVENT:', JSON.stringify(parsed));
        }

        if (eventType === 'start' && !wsStartAt) {
          wsStartAt = Date.now();
          console.log('WS START TIMING:', {
            callControlId: parsed.start?.call_control_id ?? '',
            wsConnectedToStartMs: wsStartAt - wsConnectedAt,
          });
        }

        if (eventType === 'start' && parsed.start?.call_control_id) {
          callControlId = parsed.start.call_control_id;
          streamId = parsed.stream_id || '';
          streamingSttService.startSession(callControlId);
        }

        if (eventType === 'media' && parsed.media?.payload) {
          const chunk = Buffer.from(parsed.media.payload, 'base64');

          if (!firstMediaAt) {
            firstMediaAt = Date.now();
            console.log('WS FIRST MEDIA TIMING:', {
              callControlId,
              wsConnectedToFirstMediaMs: firstMediaAt - wsConnectedAt,
              wsStartToFirstMediaMs: wsStartAt ? firstMediaAt - wsStartAt : null,
            });
          }

          if (callControlId) {
            streamingSttService.pushAudio(callControlId, chunk);
          }

          appendFileSync(rawPath, chunk);
          totalBytes += chunk.length;
        }
      } catch (err) {
        console.error('WS PARSE ERROR:', err);
      }
    });

    ws.on('close', async () => {
      console.log('WS CLOSED');
      console.log('WS SESSION SUMMARY:', {
        callControlId,
        streamId,
        messageCount,
        connectedCount,
        startCount,
        mediaCount,
        stopCount,
        firstSequenceNumber,
        lastSequenceNumber,
        totalBytes,
        wsLifetimeMs: Date.now() - wsConnectedAt,
        wsConnectedToStartMs: wsStartAt ? wsStartAt - wsConnectedAt : null,
        wsConnectedToFirstMediaMs: firstMediaAt ? firstMediaAt - wsConnectedAt : null,
        wsStartToFirstMediaMs: wsStartAt && firstMediaAt ? firstMediaAt - wsStartAt : null,
        noMediaReceived: mediaCount === 0,
      });
      console.log('WS RAW FILE SAVED:', { rawPath, totalBytes });

      if (callControlId) {
        streamingSttService.stopSession(callControlId);
      }

      if (totalBytes === 0) {
        console.log('WS CLOSED: no audio received, skipping post-process');
        return;
      }

      try {
        await processRawAudio(
          rawPath,
          wavPath,
          callControlId,
          aiService,
          callsService,
          aiOperatorService,
          false,
        );
      } catch (err) {
        console.error('POST-PROCESS ERROR:', err);
      }
    });

    ws.on('error', (err) => {
      console.error('WS ERROR:', err);
    });
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
