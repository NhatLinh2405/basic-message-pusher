import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PusherGateway } from 'src/pusher/pusher.gateway';
import { PusherService } from 'src/pusher/pusher.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly pusherService: PusherService,
    private readonly pusherGateway: PusherGateway,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    try {
      const message = await this.messageRepository.save(createMessageDto);
      // const a = await this.pusherService.triggerA('chat', 'message', message);
      const b = await this.pusherGateway.handleMessage('chat', message);
      console.log('b', b);
      return message;
    } catch (error) {
      console.log(error);
    }
  }
}
