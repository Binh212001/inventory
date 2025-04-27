import { Injectable } from '@nestjs/common';
import { TreeRepository } from 'typeorm';
import { Category } from '../entity/category.entity';

@Injectable()
export class CategoryRepository extends TreeRepository<Category> {}
