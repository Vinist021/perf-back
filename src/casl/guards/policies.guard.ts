import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CaslAbilityService } from '../casl-ability/casl-ability.service';
import { CHECK_POLICIES_KEY } from '../decorators/check-policies.decorator';
import { PolicyHandler } from '../interfaces/policy-handler.interface';
import { AuthenticatedUser } from '../../resources/auth/interfaces/authenticated-user.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly caslAbilityService: CaslAbilityService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handlers =
      this.reflector.getAllAndOverride<PolicyHandler[]>(CHECK_POLICIES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];

    if (!handlers.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as AuthenticatedUser;
    const ability = this.caslAbilityService.createForUser(user);

    const isAllowed = handlers.every((handler) =>
      handler.handle(ability, request),
    );

    if (!isAllowed) {
      throw new ForbiddenException(
        'Você não tem permissão para executar esta ação.',
      );
    }

    return true;
  }
}
