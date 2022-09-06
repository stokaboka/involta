import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Either } from '@sweet-monads/either';
import { Customer } from '@prisma/client';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  find(@Query() params): Promise<Customer[]> {
    return this.customersService.getAll();
  }

  @Post()
  async create(@Body() customer: Customer): Promise<Customer> {
    const result: Either<Error, Customer> = await this.customersService.save(
      customer,
    );
    if (result.isRight()) {
      return result.value;
    } else {
      throw result.value;
    }
  }

  @Put()
  async update(@Body() customer: Customer): Promise<Customer> {
    const result: Either<Error, Customer> = await this.customersService.save(
      customer,
    );
    if (result.isRight()) {
      return result.value;
    } else {
      throw result.value;
    }
  }

  @Delete()
  async delete(@Body() customer: Customer): Promise<Customer> {
    const result: Either<Error, Customer> = await this.customersService.remove(
      customer,
    );
    if (result.isRight()) {
      return result.value;
    } else {
      throw result.value;
    }
  }
}
