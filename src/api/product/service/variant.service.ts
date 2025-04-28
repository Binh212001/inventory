import { Injectable } from '@nestjs/common';
import { ProductVariantAttributeRepository } from '../repository/product-variant-attribute.repository';
import { ProductVariantValueRepository } from '../repository/product-variant-value.repository';
import { VariantAttribute } from '../dto/variant.req';
import { Transactional } from 'typeorm-transactional';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { ProductVariantAttribute } from '../entity/product-variant-attribute.entity';
import { paginate } from 'src/utils/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';

@Injectable()
export class VariantService {
  constructor(
    private readonly productVariantAttributeRepository: ProductVariantAttributeRepository,
    private readonly productVariantValueRepository: ProductVariantValueRepository,
  ) {}

  @Transactional()
  async create(dto: VariantAttribute) {
    const { name, values } = dto;
    const variantValues = values.map((value) => {
      return this.productVariantValueRepository.create(value);
    });
    const variantValSave =
      await this.productVariantValueRepository.save(variantValues);
    const variantAtt = this.productVariantAttributeRepository.create({
      name,
      values: variantValSave,
    });
    return await this.productVariantAttributeRepository.save(variantAtt);
  }

  async findMany(dto: PageOptionsDto) {
    const { q } = dto;
    const query = this.productVariantAttributeRepository
      .createQueryBuilder('variant')
      .leftJoinAndSelect('variant.values', 'values');
    if (q) {
      query.where('variant.name ilike :q', { q });
    }

    const [base, metaDto] = await paginate<ProductVariantAttribute>(
      query,
      dto,
      {
        skipCount: false,
        takeAll: false,
      },
    );
    return new OffsetPaginatedDto(base, metaDto);
  }

  async delete(id: string) {
    return await this.productVariantAttributeRepository.delete(id);
  }
}
