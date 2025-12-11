import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long' })
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
