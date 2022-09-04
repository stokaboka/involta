import {Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query} from '@nestjs/common';
import {CustomersService} from "./customers.service";
import {CustomersEntity} from "./customers.entity";
import {Either} from "@sweet-monads/either";
import {Customer} from "./customer.interface";

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {
    }

    @Get()
    find(@Query() params): Promise<CustomersEntity[]> {
        return this.customersService.getAll();
    }

    @Post()
    async create(@Body() customer: Customer): Promise<CustomersEntity> {
        const result: Either<Error, CustomersEntity> = await this.customersService.save(customer);
        if (result.isRight()) {
            return result.value as CustomersEntity;
        } else {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    @Put()
    async update(@Body() customer: Customer): Promise<CustomersEntity> {
        const result: Either<Error, CustomersEntity> = await this.customersService.save(customer);
        if (result.isRight()) {
            return result.value as CustomersEntity;
        } else {
            throw result.value;
        }
    }

    @Delete()
    async delete(@Body() customer: Customer): Promise<number> {
        const result: Either<Error | number, number> = await this.customersService.remove(customer.id);
        if (result.isRight()) {
            return result.value as number;
        } else {
            throw result.value;
        }
    }
}
