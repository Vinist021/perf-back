import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { Repository } from 'typeorm';
import { Users } from '../../database/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateUserResponseDto } from './dto/response/create-user.response.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';
import { UpdateUserResponseDto } from './dto/response/update-user.response.dto';
import { UserResponseDto } from './dto/response/user.response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(dto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const existing = await this.userRepository.findOneBy({ email: dto.email });
    if (existing) {
      throw new ConflictException('Já existe um usuário com este e-mail.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    return plainToInstance(CreateUserResponseDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    return plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(email: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return user;
  }

  async findOneById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    dto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (dto.email && dto.email !== user.email) {
      const existing = await this.userRepository.findOneBy({
        email: dto.email,
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('Já existe um usuário com este e-mail.');
      }
      user.email = dto.email;
    }

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.password) {
      user.hashedPassword = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.userRepository.save(user);
    return plainToInstance(UpdateUserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }
}
