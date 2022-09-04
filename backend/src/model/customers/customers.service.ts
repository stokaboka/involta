import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Either, left, right} from '@sweet-monads/either';
import {CustomersEntity} from "./customers.entity";
import {Repository} from "typeorm";
import {Customer} from "./customer.interface";
import {BadRequestError} from "../bad-request-error";
import {NotFoundError} from "../not-found-error";

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomersEntity)
        private repository: Repository<CustomersEntity>
    ) {
    }

    async getAll(): Promise<CustomersEntity[]> {
        return await this.repository.find();
    }

    async getById(id: number): Promise<CustomersEntity> {
        return await this.repository.findOneBy({id});
    }

    async countAll(): Promise<number> {
        return await this.repository.count();
    }

    async save(customer: Customer): Promise<Either<Error, CustomersEntity>> {
        try {
            const result = await this.repository.save(customer);
            return right<Error, CustomersEntity>(result);
        } catch (e) {
            return left<Error, CustomersEntity>(new BadRequestError(e));
        }
    }

    async remove(id: number): Promise<Either<Error, number>> {
        try {
            const result = await this.repository.delete({id});
            if (result.affected) {
                return right(id);
            } else {
                return left<Error, number>(new NotFoundError(new Error('Not Found')));
            }
        } catch (e) {
            return left<Error, number>(new BadRequestError(e));
        }
    }
}
