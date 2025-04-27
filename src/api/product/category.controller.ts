import { Body, Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { BunnyUploadInterceptor } from '../bunny/bunny-file-interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { ProductTemplateService } from './service/product-template.service';
import { CategoryService } from './service/category.service';

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
}
