import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: TreeRepository<Category>,
  ) {}

  async save(image: string, dto: CreateCategoryDto): Promise<Category> {
    console.log('🚀 ~ CategoryService ~ save ~ image:', image);
    try {
      const category = new Category();
      category.name = dto.name;
      category.slug = dto.slug;
      category.image = image;
      console.log('🚀 ~ CategoryService ~ save ~ category:', category);

      // Gán parent nếu có
      if (dto.parentId) {
        const parent = await this.categoryRepository.findOne({
          where: { id: dto.parentId },
        });

        if (parent) {
          category.parent = parent;
        }
      }

      return await this.categoryRepository.save(category);
    } catch (error) {
      console.log('🚀 ~ CategoryService ~ save ~ error:', error);
      throw new BadRequestException('oo');
    }
  }
}
