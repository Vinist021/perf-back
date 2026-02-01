import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';
import { CreateUserResponseDto } from './dto/response/create-user.response.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { UsersService } from './users.service';
import { SuccessResponseDTO } from '../../shared/dtos/success-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Dados do novo usuário',
    type: CreateUserResponseDto,
  })
  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Buscar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    type: UserResponseDto,
  })
  @Get()
  @HttpCode(200)
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Buscar um usuário por id' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário',
    type: UserResponseDto,
  })
  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOneById(id);
  }

  @ApiOperation({ summary: 'Atualizar os dados de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Dados do usuário',
    type: UserResponseDto,
  })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, dto);
  }

  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de sucesso',
    type: SuccessResponseDTO,
  })
  @HttpCode(200)
  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<SuccessResponseDTO> {
    return await this.usersService.remove(id);
  }
}
