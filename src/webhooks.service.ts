import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhooksService {
  handleWebhook(body: any) {
    console.log('Webhook received:', body);
    return 'OK';
  }
}
