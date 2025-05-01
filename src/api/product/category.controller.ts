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
import { CategoryService } from './service/category.service';
import { ProductTemplateService } from './service/product-template.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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
