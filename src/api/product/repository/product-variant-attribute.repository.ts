import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
import { ProductVariantAttribute } from './../entity/product-variant-attribute.entity';

@Injectable()
export class ProductVariantAttributeRepository extends BaseRepository<ProductVariantAttribute> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductVariantAttribute, dataSource.manager);
  }
}
