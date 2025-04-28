import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';
import { QuotationReq } from './dto/quotation.req';
import { QuotationService } from './quotation.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

@Controller('quotation')
export class QuotationController {
  constructor(private readonly quotationService: QuotationService) {}

  @Post()
  async create(@Body() dto: QuotationReq) {
    return this.quotationService.create(dto);
  }

  @Get()
  async findAll(@Query() dto: PageOptionsDto) {
    return this.quotationService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.quotationService.findOne(id);
  }
}
