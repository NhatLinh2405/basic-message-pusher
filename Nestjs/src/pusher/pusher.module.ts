import { Module } from '@nestjs/common';
import { PusherGateway } from './pusher.gateway';
import { PusherService } from './pusher.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PusherService, PusherGateway],
  exports: [PusherService, PusherGateway],
})
export class PusherModule {}
