import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { CustomerReq } from './dto/customer.req';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { paginate } from 'src/utils/offset-pagination';
import { OffsetPaginatedDto } from 'src/common/dto/offset-pagination/paginated.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: UserRepository) {}
  async create(createCustomerDto: CustomerReq): Promise<User> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async findAll(dto: PageOptionsDto) {
    const { q } = dto;
    const query = this.customerRepository.createQueryBuilder('customer');
    if (q) {
      query.where('customer.name ilike :q', { q });
    }

    const [base, metaDto] = await paginate<User>(query, dto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(base, metaDto);
  }

  async findOne(id: string): Promise<User> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(id: string, dto: CustomerReq): Promise<User> {
    const customer = await this.findOne(id);
    Object.assign(customer, dto);
    return this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}
