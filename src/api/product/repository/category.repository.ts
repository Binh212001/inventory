import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base.repository';
import { DataSource } from 'typeorm';
import { Category } from './../entity/category.entity';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(private readonly dataSource: DataSource) {
    super(Category, dataSource.manager);
  }
}
