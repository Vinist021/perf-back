import { Expose } from 'class-transformer';

export class UpdateUserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  constructor(partial: Partial<UpdateUserResponseDto>) {
    Object.assign(this, partial);
  }
}
