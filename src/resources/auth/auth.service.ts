import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }
}
