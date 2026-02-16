import { ApiProperty } from '@nestjs/swagger';

export class CardCreatorDTO {
  @ApiProperty()
  ownerId: string;
  @ApiProperty()
  name: string;
}
