import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../../database/entities/card.entity';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';
import { UpdateCardRequestDTO } from './dto/request/update-card-request.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateCardResponseDTO } from './dto/response/update-card-response.dto';
import { CardResponseDTO } from './dto/response/card-response.dto';
import { CreateCardResponseDTO } from './dto/response/create-card-response.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(dto: CreateCardRequestDTO): Promise<CreateCardResponseDTO> {
    const card = this.cardRepository.create(dto);

    const saved = await this.cardRepository.save(card);

    return plainToInstance(CreateCardResponseDTO, saved, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<CardResponseDTO[]> {
    const card = await this.cardRepository.find();

    return plainToInstance(CardResponseDTO, card, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<CardResponseDTO> {
    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return plainToInstance(CardResponseDTO, card, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    dto: UpdateCardRequestDTO,
  ): Promise<UpdateCardResponseDTO> {
    const card = await this.cardRepository.preload({ id, ...dto });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    const saved = await this.cardRepository.save(card);

    return plainToInstance(UpdateCardResponseDTO, saved, {
      excludeExtraneousValues: true,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} card`;
  }
}
