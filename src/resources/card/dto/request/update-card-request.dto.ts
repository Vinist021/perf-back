import { PartialType } from '@nestjs/swagger';
import { CreateCardRequestDTO } from './create-card-request.dto';

export class UpdateCardRequestDTO extends PartialType(CreateCardRequestDTO) {}
