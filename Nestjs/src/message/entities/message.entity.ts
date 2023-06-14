import { Base } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'message' })
export class Message extends Base {
  @Column()
  username: string;

  @Column()
  message: string;
}
