import { Expose } from 'class-transformer';

export class CreateUserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  constructor(partial: Partial<CreateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
