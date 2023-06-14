import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as Pusher from 'pusher';

@WebSocketGateway()
export class PusherGateway {
  @WebSocketServer() server;

  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: '1614086',
      key: '812425bbd6fed1d93e7f',
      secret: '59124f9559ffa52292f1',
      cluster: 'ap1',
      useTLS: true,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client, payload) {
    this.pusher.trigger('chat', 'message', payload);
    return payload;
  }
}
