import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CallsService } from './calls.service';
import { scenarios, defaultScenarioId } from './config/scenarios';
import { AiService } from './ai.service';

@Injectable()
export class ScenarioService {
  constructor(
    private readonly callsService: CallsService,
    private readonly aiService: AiService,
  ) {}

  async startScenario(callControlId: string) {
    const scenario = scenarios[defaultScenarioId];

    this.callsService.setCallMode(callControlId, 'scenario');

    this.callsService.setScenarioState(callControlId, {
      scenarioId: scenario.id,
      currentStepIndex: 0,
    });

    console.log('SCENARIO STARTED:', {
      callControlId,
      scenarioId: scenario.id,
      currentStepIndex: 0,
    });

    await this.executeCurrentStep(callControlId);
  }

  async executeCurrentStep(callControlId: string) {
    const state = this.callsService.getScenarioState(callControlId);

    if (!state) {
      console.log('SCENARIO STATE NOT FOUND:', { callControlId });
      return;
    }

    const scenario = scenarios[state.scenarioId];

    if (!scenario) {
      console.log('SCENARIO NOT FOUND:', {
        callControlId,
        scenarioId: state.scenarioId,
      });
      return;
    }

    const step = scenario.steps[state.currentStepIndex];

    if (!step) {
      console.log('SCENARIO FINISHED: no more steps', {
        callControlId,
        scenarioId: scenario.id,
      });
      this.finishScenario(callControlId);
      return;
    }

    console.log('EXECUTE STEP:', {
      callControlId,
      scenarioId: scenario.id,
      currentStepIndex: state.currentStepIndex,
      step,
    });

    if (step.type === 'speak') {
      const translatedText = await this.aiService.translateEsToRu(step.text);

      this.callsService.addMessage({
        callId: callControlId,
        role: 'bot',
        textEs: step.text,
        textRu: translatedText,
      });

      const apiKey = process.env.TELNYX_API_KEY;

      const speakResponse = await fetch(
        `https://api.telnyx.com/v2/calls/${callControlId}/actions/speak`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            payload: step.text,
            voice: 'AWS.Polly.Lucia',
          }),
        },
      );

      const speakText = await speakResponse.text();
      console.log('SPEAK STATUS:', speakResponse.status);
      console.log('SPEAK BODY:', speakText);
      return;
    }

    if (step.type === 'pause' && step.duration) {
      setTimeout(() => {
        void this.continueScenario(callControlId);
      }, step.duration * 1000);
      return;
    }

    if (step.type === 'hangup') {
      const apiKey = process.env.TELNYX_API_KEY;

      const hangupResponse = await fetch(
        `https://api.telnyx.com/v2/calls/${callControlId}/actions/hangup`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const hangupText = await hangupResponse.text();
      console.log('HANGUP STATUS:', hangupResponse.status);
      console.log('HANGUP BODY:', hangupText);

      this.finishScenario(callControlId);
    }
  }

  async continueScenario(callControlId: string) {
    const mode = this.callsService.getCallMode(callControlId);

    if (mode === 'operator') {
      console.log('SCENARIO STOPPED: operator mode active', { callControlId });
      return;
    }

    const state = this.callsService.getScenarioState(callControlId);

    if (!state) {
      console.log('CONTINUE FAILED: scenario state not found', { callControlId });
      return;
    }

    this.callsService.setScenarioState(callControlId, {
      ...state,
      currentStepIndex: state.currentStepIndex + 1,
    });

    console.log('SCENARIO CONTINUED:', {
      callControlId,
      nextStepIndex: state.currentStepIndex + 1,
    });

    await this.executeCurrentStep(callControlId);
  }

  finishScenario(callControlId: string) {
    this.callsService.clearScenarioState(callControlId);
    this.callsService.clearCallMode(callControlId);

    console.log('SCENARIO CLEARED:', { callControlId });
  }
}
