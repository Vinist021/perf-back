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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.usersService.create(dto);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOneById(id);
  }

  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<SuccessResponseDTO> {
    return await this.usersService.remove(id);
  }
}
