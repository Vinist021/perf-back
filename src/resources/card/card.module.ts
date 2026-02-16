import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Card } from '../../database/entities/card.entity';
import { CaslModule } from '../../casl/casl.module';
import { CardByIdGuard } from './guards/card-by-id.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), CaslModule],
  controllers: [CardController],
  providers: [CardService, CardByIdGuard],
})
export class CardModule {}
