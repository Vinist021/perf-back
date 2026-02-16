import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardRequestDTO } from './dto/request/create-card-request.dto';
import { UpdateCardRequestDTO } from './dto/request/update-card-request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCardResponseDTO } from './dto/response/create-card-response.dto';
import { CardResponseDTO } from './dto/response/card-response.dto';
import { UpdateCardResponseDTO } from './dto/response/update-card-response.dto';
import { SuccessResponseDTO } from '../../shared/dtos/success-response.dto';
import { CheckPolicies } from '../../casl/decorators/check-policies.decorator';
import { PoliciesGuard } from '../../casl/guards/policies.guard';
import { CardPolicies } from '../../casl/policies/card.policy';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { CardByIdGuard } from './guards/card-by-id.guard';

@ApiTags('cards')
@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: 'Criar novo card' })
  @ApiResponse({
    status: 201,
    description: 'Dados do novo card criado',
    type: CreateCardResponseDTO,
  })
  @HttpCode(200)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(CardPolicies.create())
  @Post()
  create(
    @Body() dto: CreateCardRequestDTO,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<CreateCardResponseDTO> {
    return this.cardService.create(dto, user);
  }

  @ApiOperation({ summary: 'Listar todos os cards' })
  @ApiResponse({
    status: 200,
    description: 'Dados dos cards',
    type: CardResponseDTO,
  })
  @HttpCode(200)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(CardPolicies.readAll())
  @Get()
  findAll(): Promise<CardResponseDTO[]> {
    return this.cardService.findAll();
  }

  @ApiOperation({ summary: 'Buscar dados de um card' })
  @ApiResponse({
    status: 200,
    description: 'Dados do card',
    type: CardResponseDTO,
  })
  @HttpCode(200)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(CardPolicies.readAll())
  @Get(':id')
  findById(@Param('id') id: string): Promise<CardResponseDTO> {
    return this.cardService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar dados de um card' })
  @ApiResponse({
    status: 200,
    description: 'Dados do card atualizado',
    type: UpdateCardResponseDTO,
  })
  @HttpCode(200)
  @UseGuards(CardByIdGuard, PoliciesGuard)
  @CheckPolicies(CardPolicies.updateOwn())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCardRequestDTO,
  ): Promise<UpdateCardResponseDTO> {
    return this.cardService.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletar card' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de sucesso',
    type: SuccessResponseDTO,
  })
  @HttpCode(200)
  @UseGuards(CardByIdGuard, PoliciesGuard)
  @CheckPolicies(CardPolicies.deleteOwn())
  @Delete(':id')
  remove(@Param('id') id: string): Promise<SuccessResponseDTO> {
    return this.cardService.remove(id);
  }
}
