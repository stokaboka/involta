import { Module } from '@nestjs/common';
import { LocksGateway } from './locks-gateway';
import { LocksModule } from '../../locks/locks.module';

@Module({
  imports: [LocksModule],
  providers: [LocksGateway],
  exports: [LocksGateway],
})
export class LocksGatewayModule {}
