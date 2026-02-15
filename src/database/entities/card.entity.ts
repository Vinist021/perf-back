import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class Card extends AbstractEntity<Card> {
  @Column()
  type: string;

  @Column()
  author: string;

  @Column('text', { array: true, nullable: true })
  hints: string[];

  @Column()
  answer: string;
}
