import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

@Entity()
export class Card extends AbstractEntity {
  @Column()
  type: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  hints: string[];

  @Column()
  answer: string;
}
