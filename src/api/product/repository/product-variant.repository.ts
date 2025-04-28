import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductVariant } from '../entity/product-variant.entity';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
@Injectable()
export class ProductVariantRepository extends BaseRepository<ProductVariant> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductVariant, dataSource.manager);
  }
}
