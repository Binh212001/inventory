import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductVariant } from '../entity/product-variant.entity';

@Injectable()
export class ProductVariantRepository extends Repository<ProductVariant>{
}