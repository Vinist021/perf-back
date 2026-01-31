import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() dto: CreateCardRequestDTO) {
    return this.cardService.create(dto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCardDto: UpdateCardRequestDTO) {
  //   return this.cardService.update(+id, updateCardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cardService.remove(+id);
  // }
}
