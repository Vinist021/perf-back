import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';
import { Card } from '../../database/entities/card.entity';
import { UpdateCardRequestDTO } from './dto/request/update-card-request.dto';

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

  findAll() {
    return this.cardRepository.find();
  }

  async findOne(id: number) {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card;
  }

  // update(id: number, dto: UpdateCardRequestDTO) {

  //   const card = this.cardRepository.preload({

  //   return ;

  // // remove(id: number) {
  // //   return `This action removes a #${id} card`;
  // // }
}
