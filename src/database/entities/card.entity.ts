import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract-entity';
import { CardCreatorDTO } from '../../resources/card/dto/response/card-creator.dto';

@Entity()
export class Card extends AbstractEntity<Card> {
  @Column()
  type: string;

  @Column('jsonb', { nullable: true })
  creator: CardCreatorDTO;

  @Column()
  author: string;

  @Column('text', { array: true, nullable: true })
  hints: string[];

  @Column()
  answer: string;
}
