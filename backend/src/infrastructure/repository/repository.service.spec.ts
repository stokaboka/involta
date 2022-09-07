import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryService } from './repository.service';
import { PrismaService } from './prisma/prisma.service';

describe('RepositoryService', () => {
  let service: RepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, RepositoryService],
    }).compile();

    service = module.get<RepositoryService>(RepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
