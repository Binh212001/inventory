import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTemplate } from '../entity/product-template.entity';
import { ProductTemplateReqDto } from '../dto/product-template.req';
import { ProductTemplateRepository } from '../repository/product-template.repository';
import { ProductVariantRepository } from '../repository/product-variant.repository';
import { ProductVariantAttributeRepository } from '../repository/product-variant-attribute.repository';
import { ProductVariantValueRepository } from '../repository/product-variant-value.repository';

@Injectable()
export class ProductTemplateService {
  constructor(
    private readonly productTemplateRepository: ProductTemplateRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly productVariantAttributeRepository: ProductVariantAttributeRepository,
    private readonly productVariantValueRepository: ProductVariantValueRepository,

  ) {}

  async create(dto: ProductTemplateReqDto): Promise<ProductTemplate> {
    const productTemplate = this.productTemplateRepository.create(dto);
    return this.productTemplateRepository.save(productTemplate);
  }

  async findAll(): Promise<ProductTemplate[]> {
    return this.productTemplateRepository.find({ relations: ['variants'] });
  }

  async findOne(id: number): Promise<ProductTemplate | null> {
    return this.productTemplateRepository.findOne( {
        where:{id},
        relations: ['variants'] });
  }

  async update(id: number, dto: ProductTemplateReqDto): Promise<boolean> {
    await this.productTemplateRepository.update(id, dto);
    return  true
  }

  async delete(id: number): Promise<void> {
    await this.productTemplateRepository.delete(id);
  }
}