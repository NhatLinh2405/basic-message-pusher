import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    default: 'linh',
    type: String,
  })
  @IsString()
  username: string;

  @ApiProperty({
    default: 'hello',
    type: String,
  })
  @IsString()
  message: string;
}
