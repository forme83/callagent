import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AiService } from './ai.service';
import { CallsService } from './calls.service';
import { AiOperatorService } from './ai-operator.service';
import { processRawAudio } from './raw-processor';
import { readFileSync, writeFileSync } from 'fs';

async function bootstrap() {
  const rawPath = process.argv[2];
  const callControlId = process.argv[3] ?? '';

  if (!rawPath) {
    console.error('Usage: node dist/raw-runner.js <rawPath> [callControlId]');
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule);
  const aiService = app.get(AiService);
  const callsService = app.get(CallsService);
  const aiOperatorService = app.get(AiOperatorService);

  const buffer = readFileSync(rawPath);

  const windowSize = 48000; // ~6 sec
  const stepSize = 24000;   // ~3 sec

  let index = 0;
  let chunkIndex = 0;

  try {
    while (index < buffer.length) {
      const chunk = buffer.slice(index, index + windowSize);

      const chunkRawPath = rawPath.replace('.raw', `.chunk-${chunkIndex}.raw`);
      const chunkWavPath = rawPath.replace('.raw', `.chunk-${chunkIndex}.wav`);

      writeFileSync(chunkRawPath, chunk);

      console.log('PROCESS CHUNK:', chunkIndex, 'bytes:', chunk.length);

      await processRawAudio(
        chunkRawPath,
        chunkWavPath,
        callControlId,
        aiService,
        callsService,
        aiOperatorService,
        false,
      );

      index += stepSize;
      chunkIndex += 1;
    }
  } catch (err) {
    console.error('RAW RUNNER ERROR:', err);
  } finally {
    await app.close();
  }
}

bootstrap();
