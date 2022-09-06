import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { BadRequestError } from '../../errors/bad-request-error';
import { NotFoundError } from '../../errors/not-found-error';

@Injectable()
export class RepositoryService {
  constructor(readonly repository: PrismaService) {}

  public get customer() {
    return this.repository.customer;
  }

  public getProcessedError(error: any): Error {
    if (error.detail && error.detail.indexOf('RecordNotFound')) {
      return new NotFoundError(error);
    }
    return new BadRequestError(error);
  }
}
