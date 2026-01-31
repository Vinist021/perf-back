import { Expose } from 'class-transformer';

export class CardResponseDTO {
  @Expose()
  type: string;
  @Expose()
  author: string;
  @Expose()
  hints: string[];
  @Expose()
  answer: string;
}
