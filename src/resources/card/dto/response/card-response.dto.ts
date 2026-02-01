import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CardResponseDTO {
  @ApiProperty()
  @Expose()
  id: string;
  @ApiProperty()
  @Expose()
  type: string;
  @ApiProperty()
  @Expose()
  author: string;
  @ApiProperty()
  @Expose()
  hints: string[];
  @ApiProperty()
  @Expose()
  answer: string;
}
