import { ApiProperty } from '@nestjs/swagger';

export class CardCreatorDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
