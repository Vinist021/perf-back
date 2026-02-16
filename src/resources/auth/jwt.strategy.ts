import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserRole from '../../database/enums/roleEnum';

type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default',
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  }
}
