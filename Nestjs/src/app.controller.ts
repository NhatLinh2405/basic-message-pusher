import { Body, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PusherService } from './pusher/pusher.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pusherService: PusherService,
  ) {}

  @Get()
  async message(@Body() username: string, message: string) {
    return await this.pusherService.triggerA('chat', 'message', {
      username,
      message,
    });
  }
}
