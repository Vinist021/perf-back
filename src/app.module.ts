import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../data-source';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { CardModule } from './resources/card/card.module';
import { CaslModule } from './casl/casl.module';
import { JwtAuthGuard } from './resources/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UsersModule,
    AuthModule,
    CardModule,
    CaslModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
