import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { RepositoryService } from '../../infrastructure/repository/repository.service';
import { PrismaService } from '../../infrastructure/repository/prisma/prisma.service';
import { Customer } from '@prisma/client';

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

  it('should count all customers', async () => {
    expect(service).toBeDefined();
    const customer = {
      id: 0,
    } as Customer;
    const result = await service.countAll(customer);
    expect(result.isRight()).toBeTruthy();
  });

  it('should get all customers', async () => {
    expect(service).toBeDefined();
    const customer = {
      id: 0,
    } as Customer;
    const result = await service.getAll(customer);
    expect(result.isRight()).toBeTruthy();
  });

  it('should get the customer by ID', async () => {
    expect(service).toBeDefined();
    const result = await service.getById(0);
    expect(result.isRight()).toBeTruthy();
  });

  it('should create a customer', async () => {
    expect(service).toBeDefined();
    const customer = {
      birthday: null,
      email: null,
      firstName: 'firstName',
      id: 0,
      lastName: null,
      phone: null,
      secondName: 'secondName',
    } as Customer;
    const result = await service.create(customer);

    expect(result.isRight()).toBeTruthy();

    const value = result.value as Customer;
    delete value.id;
    delete customer.id;

    expect(value).toEqual(customer);
  });

  it('should update the customer', async () => {
    expect(service).toBeDefined();
    const customer = {
      birthday: null,
      email: null,
      firstName: 'John',
      id: 0,
      lastName: 'Winston',
      phone: null,
      secondName: 'Lennon',
    } as Customer;
    const result = await service.update(customer);

    expect(result.isRight()).toBeTruthy();

    const value = result.value as Customer;
    delete value.id;
    delete customer.id;

    expect(value).toEqual(customer);
  });

  it('should remove the customer', async () => {
    expect(service).toBeDefined();
    const customer = {
      birthday: null,
      email: null,
      firstName: 'John',
      id: 0,
      lastName: 'Winston',
      phone: null,
      secondName: 'Lennon',
    } as Customer;
    const result = await service.remove(customer);

    expect(result.isRight()).toBeTruthy();

    const value = result.value as Customer;
    expect(value).toEqual(customer);
  });
});
