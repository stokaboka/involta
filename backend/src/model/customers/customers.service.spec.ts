import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { RepositoryService } from '../../infrastructure/repository/repository.service';
import { PrismaService } from '../../infrastructure/repository/prisma/prisma.service';

describe('CustomersService', () => {
  let service: CustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, RepositoryService, CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
