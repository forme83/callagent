import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhooksController } from './webhooks.controller';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';
import { ScenarioService } from './scenario.service';
import { AiService } from './ai.service';
import { TelnyxService } from './telnyx.service';
import { AiOperatorService } from './ai-operator.service';
import { StreamingSttService } from './streaming-stt.service';

@Module({
  imports: [],
  controllers: [AppController, WebhooksController, CallsController],
  providers: [
    AppService,
    CallsService,
    ScenarioService,
    AiService,
    TelnyxService,
    AiOperatorService,
    StreamingSttService,
  ],
})
export class AppModule {}
