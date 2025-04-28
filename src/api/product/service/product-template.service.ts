import { flatten, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTemplate } from '../entity/product-template.entity';
import { ProductTemplateReqDto } from '../dto/product-template.req';
import { ProductTemplateRepository } from '../repository/product-template.repository';
import { ProductVariantRepository } from '../repository/product-variant.repository';
import { ProductVariantAttributeRepository } from '../repository/product-variant-attribute.repository';
import { ProductVariantValueRepository } from '../repository/product-variant-value.repository';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { paginate } from 'src/utils/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';

@Injectable()
export class ProductTemplateService {
  constructor(
    private readonly productTemplateRepository: ProductTemplateRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly productVariantAttributeRepository: ProductVariantAttributeRepository,
    private readonly productVariantValueRepository: ProductVariantValueRepository,
  ) {}

  async create(
    files: string[],
    dto: ProductTemplateReqDto,
  ): Promise<ProductTemplate> {
    const productTemplate = this.productTemplateRepository.create({
      ...dto,
      images: files,
    });
    return this.productTemplateRepository.save(productTemplate);
  }

  async findAll(dto: PageOptionsDto) {
    const { q } = dto;

    const query = this.productTemplateRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.variants', 'variants');

    if (q) {
      query.where('products.name ilike :q', { q });
    }

    query.orderBy('products.id', 'DESC');
    const [base, metaDto] = await paginate<ProductTemplate>(query, dto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(base, metaDto);
  }

  async findOne(id: string): Promise<ProductTemplate | null> {
    return this.productTemplateRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    dto: ProductTemplateReqDto,
    images: string[],
  ): Promise<boolean> {
    await this.productTemplateRepository.update(id, {
      ...dto,
      images: images,
    });
    return true;
  }

  async delete(id: string): Promise<void> {
    await this.productTemplateRepository.delete(id);
  }
}
