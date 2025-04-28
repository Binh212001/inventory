import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerReq } from './dto/customer.req';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post()
  async create(@Body() createCustomerDto: CustomerReq) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  async findAll(@Query() dto: PageOptionsDto) {
    return this.customerService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CustomerReq) {
    return this.customerService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
