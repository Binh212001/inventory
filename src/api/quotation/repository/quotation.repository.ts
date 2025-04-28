import { Quotation } from './../entity/quotation.entity';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class QuotationRepository extends BaseRepository<Quotation> {
  constructor(private readonly dataSource: DataSource) {
    super(Quotation, dataSource.manager);
  }
}
