import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [PrismaService, RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
