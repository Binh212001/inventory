import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductTemplate } from '../entity/product-template.entity';

@Injectable()
export class ProductTemplateRepository extends Repository<ProductTemplate> {}
