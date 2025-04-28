import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
import { Customer } from '../entity/customer.entity';

@Injectable()
export class CustomerRepository extends BaseRepository<Customer> {
  constructor(private readonly dataSource: DataSource) {
    super(Customer, dataSource.manager);
  }
}
