import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import UserRole from '../../../../database/enums/roleEnum';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  role: UserRole;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
