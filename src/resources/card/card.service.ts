import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../database/entities/card.entity';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';
import { UpdateCardRequestDTO } from './dto/request/update-card-request.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateCardResponseDTO } from './dto/response/update-card-response.dto';

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

  async update(id: number, dto: UpdateCardRequestDTO) {
    const card = await this.cardRepository.preload({ id, ...dto });

    if (!card) {
      throw new NotFoundException(`Card de id ${id} não encontrado`);
    }

    const saved = await this.cardRepository.save(card);

    return plainToInstance(UpdateCardResponseDTO, saved, {
      excludeExtraneousValues: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
