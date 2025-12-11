import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateUserResponseDto } from './dto/response/create-user.response.dto';
import * as bcrypt from 'bcrypt';

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
    return plainToInstance(CreateUserResponseDto, savedUser);
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
