import { BadRequestException, Injectable } from '@nestjs/common';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { ILike } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async save(image: string, dto: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    category.name = dto.name;
    category.slug = dto.slug;
    category.image = image;

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
  }

  async getCategories(dto: PageOptionsDto) {
    const { q } = dto;
    if (q) {
      return await this.categoryRepository.find({
        where: {
          name: ILike(q),
        },
      });
    }
    return await this.categoryRepository.find({});
  }

  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
