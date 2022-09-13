import { LocksGateway } from './locks-gateway';
import { LocksService } from '../../locks/locks.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('LocksGateway', () => {
  it('should be defined', () => {
    const srv = new LocksService(new EventEmitter2());
    expect(new LocksGateway(srv)).toBeDefined();
  });
});
