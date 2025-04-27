import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductVariantAttribute } from './../entity/product-variant-attribute.entity';

@Injectable()
export class ProductVariantAttributeRepository extends Repository<ProductVariantAttribute>{
}