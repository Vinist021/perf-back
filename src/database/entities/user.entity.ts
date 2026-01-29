import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class User extends AbstractEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;
}
