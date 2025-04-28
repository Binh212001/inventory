import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
import { ProductTemplate } from '../entity/product-template.entity';

@Injectable()
export class ProductTemplateRepository extends BaseRepository<ProductTemplate> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductTemplate, dataSource.manager);
  }
}
