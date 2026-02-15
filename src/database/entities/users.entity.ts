import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import UserRole from '../enums/roleEnum';

@Entity()
export class Users extends AbstractEntity<Users> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ default: UserRole.MEMBER })
  role: UserRole;
}
