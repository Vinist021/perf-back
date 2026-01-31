import { Injectable } from '@nestjs/common';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';
import { UpdateCardRequestDTO } from './dto/request/update-card-request.dto';

@Injectable()
export class CardService {
  create(createCardDto: CreateCardRequestDTO) {
    return 'This action adds a new card';
  }

  findAll() {
    return `This action returns all card`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardRequestDTO) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
