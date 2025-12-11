import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateUserResponseDto } from './dto/response/create-user.response.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async findAll(): Promise<CreateUserResponseDto[]> {
    const users = await this.userRepository.find();

    return plainToInstance(CreateUserResponseDto, users, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<CreateUserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });

    return plainToInstance(CreateUserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    dto: UpdateUserRequestDto,
  ): Promise<UpdateUserRequestDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
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
    return plainToInstance(UpdateUserRequestDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
