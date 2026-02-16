import { Module } from '@nestjs/common';
import { CaslAbilityService } from './casl-ability/casl-ability.service';
import { PoliciesGuard } from './guards/policies.guard';

@Module({
  providers: [CaslAbilityService, PoliciesGuard],
  exports: [CaslAbilityService, PoliciesGuard],
})
export class CaslModule {}
