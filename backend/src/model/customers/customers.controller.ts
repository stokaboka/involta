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
  async find(@Query() params): Promise<Customer[]> {
    const customer = params as Customer;
    const result = await this.customersService.getAll(customer);
    if (result.isRight()) {
      return result.value;
    } else {
      throw result.value;
    }
  }

  @Post()
  async create(@Body() customer: Customer): Promise<Customer> {
    const result = await this.customersService.create(
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
    const result = await this.customersService.update(
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
    const result = await this.customersService.remove(customer);
    if (result.isRight()) {
      return result.value;
    } else {
      throw result.value;
    }
  }
}
