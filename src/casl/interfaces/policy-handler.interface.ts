import { Request } from 'express';
import { AppAbility } from '../casl-ability/casl-ability.types';

export interface IPolicyHandler {
  handle(ability: AppAbility, request: Request): boolean;
}

export type PolicyHandler = IPolicyHandler;
