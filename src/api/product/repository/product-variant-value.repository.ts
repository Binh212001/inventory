import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
import { ProductVariantValue } from '../entity/product-variant-value.entity';
@Injectable()
export class ProductVariantValueRepository extends BaseRepository<ProductVariantValue> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductVariantValue, dataSource.manager);
  }
}
