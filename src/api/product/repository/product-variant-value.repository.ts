import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductVariant } from '../entity/product-variant.entity';
import { ProductVariantAttribute } from '../entity/product-variant-attribute.entity';
import { ProductVariantValue } from '../entity/product-variant-value.entity';

@Injectable()
export class ProductVariantValueRepository extends Repository<ProductVariantValue>{
}