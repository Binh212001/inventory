import { Module } from '@nestjs/common';
import { ProductTemplateController } from './product-template.controller';
import { ProductTemplateRepository } from './repository/product-template.repository';
import { ProductVariantRepository } from './repository/product-variant.repository';
import { ProductVariantValueRepository } from './repository/product-variant-value.repository';
import { ProductTemplateService } from './service/product-template.service';
import { ProductVariantAttributeRepository } from './repository/product-variant-attribute.repository';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './service/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { TreeRepository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category, CategoryRepository])],
  controllers: [ProductTemplateController, CategoryController],
  providers: [
    ProductTemplateRepository,
    ProductVariantRepository,
    ProductVariantValueRepository,
    CategoryRepository,
    ProductVariantAttributeRepository,
    ProductTemplateService,
    CategoryService,
    TreeRepository,
  ],
  exports: [
    ProductTemplateRepository,
    ProductVariantRepository,
    ProductVariantValueRepository,
    CategoryRepository,
    ProductVariantAttributeRepository,
    ProductTemplateService,
    CategoryService,
    TreeRepository,
  ],
})
export class ProductModule {}
