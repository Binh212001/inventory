import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryController } from './product/category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'src/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [ProductModule],
})
export class ApiModule {}
