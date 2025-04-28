import { CategoryService } from './service/category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { BunnyUploadInterceptor } from '../bunny/bunny-file-interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { ProductVariantAttributeRepository } from './repository/product-variant-attribute.repository';
import { ProductVariantValueRepository } from './repository/product-variant-value.repository';
import { VariantAttribute } from './dto/variant.req';
import { VariantService } from './service/variant.service';

@Controller('product-variant')
export class VariantController {
  constructor(private readonly variantService: VariantService) {}

  @Post()
  create(@Body() dto: VariantAttribute) {
    return this.variantService.create(dto);
  }

  @Post()
  findMany(@Query() dto: PageOptionsDto) {
    return this.variantService.findMany(dto);
  }

  @Delete()
  delete(@Param('id') id: string) {
    return this.variantService.delete(id);
  }
}
