import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingSttService {
  startSession(callControlId: string) {
    console.log('STREAMING STT START SESSION:', callControlId);
  }

  pushAudio(callControlId: string, chunk: Buffer) {
    console.log('STREAMING STT PUSH AUDIO:', {
      callControlId,
      bytes: chunk.length,
    });
  }

  stopSession(callControlId: string) {
    console.log('STREAMING STT STOP SESSION:', callControlId);
  }
}
