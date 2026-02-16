import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/response/user.response.dto';
import { UsersService } from '../users/users.service';
import { loginResponseDTO } from './dto/login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.hashedPassword))) {
      const result = { ...user };
      return plainToInstance(UserResponseDto, result, {
        excludeExtraneousValues: true,
      });
    }
    return null;
  }

  async login(user: UserResponseDto): Promise<loginResponseDTO> {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const result = await this.jwtService.signAsync(payload);

    return new loginResponseDTO(result);
  }
}
