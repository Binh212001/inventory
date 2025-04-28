import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
import { QuotationItem } from '../entity/quotation-item.entity';

@Injectable()
export class QuotationItemRepository extends BaseRepository<QuotationItem> {
  constructor(private readonly dataSource: DataSource) {
    super(QuotationItem, dataSource.manager);
  }
}
