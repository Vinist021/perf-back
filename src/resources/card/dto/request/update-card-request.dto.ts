import { PartialType } from '@nestjs/mapped-types';
import { CreateCardRequestDTO } from './create-card-request.dto';

export class UpdateCardRequestDTO extends PartialType(CreateCardRequestDTO) {}
