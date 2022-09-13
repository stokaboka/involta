import { Module } from '@nestjs/common';
import { RepositoryModule } from './repository/repository.module';
import { LocksGatewayModule } from './gateways/locks-gateway/locks-gateway.module';
import { LocksModule } from './locks/locks.module';

@Module({
  imports: [RepositoryModule, LocksGatewayModule, LocksModule],
  exports: [RepositoryModule, LocksGatewayModule, LocksModule],
})
export class InfrastructureModule {}
