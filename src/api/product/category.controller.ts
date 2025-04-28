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
import { BunnyUploadInterceptor } from '../bunny/bunny-file-interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { ProductTemplateService } from './service/product-template.service';
import { CategoryService } from './service/category.service';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly productTemplateService: ProductTemplateService,

    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @UseInterceptors(new BunnyUploadInterceptor())
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @Req() req,
  ): Promise<Category> {
    return await this.categoryService.save(req.fileUrls[0], dto);
  }

  @Get()
  async getCategories(@Query() dto: PageOptionsDto) {
    return await this.categoryService.getCategories(dto);
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
