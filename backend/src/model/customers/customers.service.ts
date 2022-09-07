import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@sweet-monads/either';
import { RepositoryService } from '../../infrastructure/repository/repository.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private repositoryService: RepositoryService) {}

  get repository() {
    return this.repositoryService.customer;
  }

  async getAll(customer: Customer): Promise<Either<Error, Customer[]>> {
    try {
      const result = await this.repository.findMany({ where: customer });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }

  async getById(id: number): Promise<Either<Error, Customer>> {
    try {
      const result = await this.repository.findUnique({
        where: { id: Number(id) },
      });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }

  async countAll(customer: Customer): Promise<Either<Error, number>> {
    try {
      const result = await this.repository.count({ where: customer });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }

  async create(customer: Customer): Promise<Either<Error, Customer>> {
    try {
      const result = await this.repository.create({
        data: customer,
      });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }

  async update(customer: Customer): Promise<Either<Error, Customer>> {
    try {
      const result = await this.repository.update({
        where: { id: Number(customer.id) },
        data: customer,
      });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }

  async save(customer: Customer): Promise<Either<Error, Customer>> {
    try {
      const result = await this.repository.upsert({
        where: { id: Number(customer.id) },
        update: customer,
        create: customer,
      });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }

  async remove(customer: Customer): Promise<Either<Error, Customer>> {
    try {
      const result = await this.repository.delete({
        where: { id: Number(customer.id) },
      });
      return right(result);
    } catch (error) {
      return left(this.repositoryService.getProcessedError(error));
    }
  }
}
