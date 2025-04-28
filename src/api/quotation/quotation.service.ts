import { ProductTemplateRepository } from './../product/repository/product-template.repository';
import { ProductTemplate } from './../product/entity/product-template.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quotation } from './entity/quotation.entity';
import { QuotationReq } from './dto/quotation.req';
import { QuotationRepository } from './repository/quotation.repository';
import { QuotationItemRepository } from './repository/quotation-item.repository';
import { ProductModule } from '../product/product.module';
import { ProductVariantRepository } from '../product/repository/product-variant.repository';
import { CustomerRepository } from '../customer/repository/customer.repository';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { paginate } from 'src/utils/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';

@Injectable()
export class QuotationService {
  constructor(
    private readonly quotationRepository: QuotationRepository,
    private readonly quotationItemRepository: QuotationItemRepository,
    private readonly productTemplateRepository: ProductTemplateRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}
  async create(dto: QuotationReq): Promise<Quotation> {
    const { customerId, items } = dto;

    const customer = await this.customerRepository.findOneBy({
      id: customerId,
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const productItems = await Promise.all(
      items.map(async (item) => {
        const pr = await this.productTemplateRepository.findOneBy({
          id: item.productId,
        });
        if (!pr) {
          throw new BadRequestException('Product not found');
        }
        return this.quotationItemRepository.create({
          ...item,
          product: pr,
        });
      }),
    );

    const quotation = this.quotationRepository.create({
      customer,
      items: productItems,
      totalAmount: items.reduce((pre, item) => {
        return pre + item.quantity * item.unitPrice;
      }, 0),
    });
    return this.quotationRepository.save(quotation);
  }

  async findAll(dto: PageOptionsDto) {
    const { q } = dto;
    const query = this.quotationRepository
      .createQueryBuilder('quotation')
      .leftJoinAndSelect('quotation.customer', 'customer')
      .leftJoinAndSelect('quotation.items', 'items');

    if (q) {
      query.where('customer.name ilike :q', { q });
    }

    const [base, metaDto] = await paginate<Quotation>(query, dto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(base, metaDto);
  }

  async findOne(id: string): Promise<Quotation> {
    const quotation = await this.quotationRepository.findOne({ where: { id } });
    if (!quotation) {
      throw new NotFoundException(`Quotation with ID ${id} not found`);
    }
    return quotation;
  }
}
