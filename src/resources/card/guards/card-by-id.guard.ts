import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Card } from '../../../database/entities/card.entity';

@Injectable()
export class CardByIdGuard implements CanActivate {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const id = request.params?.id;

    if (!id) {
      return true;
    }

    const card = await this.cardRepository.findOneBy({ id });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    (request as Request & { card: Card }).card = card;
    return true;
  }
}
