import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  pusher: Pusher;
  constructor() {
    this.pusher = new Pusher({
      appId: '1614086',
      key: '812425bbd6fed1d93e7f',
      secret: '59124f9559ffa52292f1',
      cluster: 'ap1',
      useTLS: true,
    });
  }

  async triggerA(channel: string, event: string, data: any) {
    return await this.pusher.trigger(channel, event, data);
  }
}
