import { Test, TestingModule } from '@nestjs/testing';
import { LocksService } from './locks.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('LocksService', () => {
  let service: LocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocksService, EventEmitter2],
    }).compile();

    service = module.get<LocksService>(LocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
