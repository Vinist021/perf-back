import { Injectable } from '@nestjs/common';
import UserRole from '../../database/enums/roleEnum';
import { Card } from '../../database/entities/card.entity';
import { AuthenticatedUser } from '../../resources/auth/interfaces/authenticated-user.interface';
import {
  Action,
  AppAbility,
  createAbilityBuilder,
  detectSubjectType,
} from './casl-ability.types';

@Injectable()
export class CaslAbilityService {
  createForUser(user: AuthenticatedUser): AppAbility {
    const { can, build } = createAbilityBuilder();

    if (user.role === UserRole.ADMIN) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, Card);
      can(Action.Create, Card);
      can([Action.Update, Action.Delete], Card, { ownerId: user.userId });
    }

    return build({ detectSubjectType });
  }
}
