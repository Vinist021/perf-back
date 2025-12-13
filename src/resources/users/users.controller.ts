import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserResponseDto } from './dto/response/create-user.response.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';
import { UserResponseDto } from './dto/response/user.response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const created = await this.usersService.create(dto);
    return plainToInstance(CreateUserResponseDto, created);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<UserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeById(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
