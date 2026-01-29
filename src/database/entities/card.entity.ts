import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class Card extends AbstractEntity {
  @Column()
  type: string;

  @Column()
  author: string;

  @Column({ type: 'jsonb', nullable: true })
  hints: JSON;

  @Column()
  answer: string;
}
