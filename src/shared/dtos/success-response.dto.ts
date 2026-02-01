import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDTO {
  @ApiProperty()
  message: string;

  constructor(config: { message: string }) {
    this.message = config.message;
  }
}
