import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsArray } from 'class-validator';

export class CreateCardRequestDTO {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  @MinLength(1, { message: 'Title must be at least 1 character long' })
  @MaxLength(40, { message: 'Title must be at most 40 characters long' })
  type: string;

  @ApiProperty()
  @IsString({ message: 'Author must be a string' })
  author: string;

  @ApiProperty()
  @IsArray({ message: 'Hints must be an array' })
  @IsString({ each: true, message: 'Each hint must be a string' })
  hints: string[];

  @ApiProperty()
  @IsString({ message: 'Question must be a string' })
  @MinLength(1, { message: 'Question must be at least 1 character long' })
  @MaxLength(255, { message: 'Question must be at most 255 characters long' })
  answer: string;
}
