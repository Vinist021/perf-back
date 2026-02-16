import { Request } from 'express';
import { Card } from '../../database/entities/card.entity';
import { Action, AppAbility } from '../casl-ability/casl-ability.types';
import { PolicyHandler } from '../interfaces/policy-handler.interface';

class ReadCardPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Read, Card);
  }
}

class CreateCardPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility): boolean {
    return ability.can(Action.Create, Card);
  }
}

class UpdateOwnCardPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility, request: Request): boolean {
    const card = (request as Request & { card?: Card }).card;

    if (!card) {
      return false;
    }

    return ability.can(Action.Update, card);
  }
}

class DeleteOwnCardPolicyHandler implements PolicyHandler {
  handle(ability: AppAbility, request: Request): boolean {
    const card = (request as Request & { card?: Card }).card;

    if (!card) {
      return false;
    }

    return ability.can(Action.Delete, card);
  }
}

export class CardPolicies {
  static readAll(): PolicyHandler {
    return new ReadCardPolicyHandler();
  }

  static create(): PolicyHandler {
    return new CreateCardPolicyHandler();
  }

  static updateOwn(): PolicyHandler {
    return new UpdateOwnCardPolicyHandler();
  }

  static deleteOwn(): PolicyHandler {
    return new DeleteOwnCardPolicyHandler();
  }
}
