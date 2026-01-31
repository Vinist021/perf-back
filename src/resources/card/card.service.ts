import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';
import { Card } from '../../database/entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  create(dto: CreateCardRequestDTO) {
    const card = this.cardRepository.create(dto);

    return this.cardRepository.save(card);
  }

  // findAll() {
  //   return `This action returns all card`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} card`;
  // }

  // update(id: number, dto: UpdateCardRequestDTO) {
  //   return `This action updates a #${id} card`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} card`;
  // }
}
