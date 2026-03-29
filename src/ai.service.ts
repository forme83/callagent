import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import { CallMessage } from './calls.service';
import { aiRoleProfiles, buildRoleProfilePrompt } from './ai-role-profiles';

@Injectable()
export class AiService {
  async translateRuToEs(text: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY not set');
      return text;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          input: `Translate this text from Russian to Spanish. Only return translated text:\n\n${text}`,
        }),
      });

      const data = await response.json();
      const translated = data?.output?.[0]?.content?.[0]?.text;

      return translated || text;
    } catch (err) {
      console.error('TRANSLATION ERROR:', err);
      return text;
    }
  }

  async translateEsToRu(text: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY not set');
      return text;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          input: `Translate this text from Spanish to Russian. Only return translated text:\n\n${text}`,
        }),
      });

      const data = await response.json();
      const translated = data?.output?.[0]?.content?.[0]?.text;

      return translated || text;
    } catch (err) {
      console.error('TRANSLATION ERROR:', err);
      return text;
    }
  }

  async transcribeWavFile(filePath: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY not set');
      return '';
    }

    try {
      const form = new FormData();
      form.append('file', fs.createReadStream(filePath));
      form.append('model', 'gpt-4o-transcribe');

      const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          ...form.getHeaders(),
        },
        body: form as any,
      });

      const data = await response.json();
      const text = data?.text ?? '';

      console.log('TRANSCRIBE STATUS:', response.status);
      console.log('TRANSCRIBE TEXT:', text);

      return text;
    } catch (err) {
      console.error('TRANSCRIBE ERROR:', err);
      return '';
    }
  }

  async generateOperatorReply(messages: CallMessage[]): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY not set');
      return '';
    }

    const activeProfile = aiRoleProfiles.rental_listing;
    const roleProfilePrompt = buildRoleProfilePrompt(activeProfile);

    const recentMessages = messages.slice(-12);

    const historyText = recentMessages
      .map((message) => {
        const roleLabel =
          message.role === 'human'
            ? 'CLIENT'
            : message.role === 'operator'
              ? 'OPERATOR'
              : 'AGENT';

        return `${roleLabel}: ${message.textEs}`;
      })
      .join('\n');

    const input = [
      'You are generating the next reply for a live outbound phone call.',
      'Reply only in Spanish.',
      'Write only the next spoken agent reply.',
      'Keep it natural for a real phone conversation in Spain.',
      'Usually keep it brief: 1 to 2 sentences.',
      'Ask only one clear question at a time when possible.',
      'Do not invent facts, names, addresses, prices, or documents.',
      'Do not act like inbound customer support or a general help desk.',
      'Do not ask generic questions if a concrete context-aware question is possible.',
      '',
      roleProfilePrompt,
      '',
      'Conversation history:',
      historyText,
      '',
      'Now write the next agent reply in Spanish only.',
    ].join('\n');

    try {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          input,
        }),
      });

      const data = await response.json();
      const reply = data?.output?.[0]?.content?.[0]?.text?.trim() ?? '';

      console.log('AI OPERATOR STATUS:', response.status);
      console.log('AI OPERATOR REPLY:', reply);

      return reply;
    } catch (err) {
      console.error('AI OPERATOR ERROR:', err);
      return '';
    }
  }
}
