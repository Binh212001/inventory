import { request } from './../../../node_modules/http2-wrapper/index.d';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  Req,
  Query,
} from '@nestjs/common';
import { ProductTemplateReqDto } from './dto/product-template.req';
import { ProductTemplateService } from './service/product-template.service';
import { BunnyUploadInterceptor } from '../bunny/bunny-file-interceptor';
import { PageOptionsDto } from 'src/common/dto/offset-pagination/page-options.dto';

@Controller('product')
export class ProductTemplateController {
  constructor(
    private readonly productTemplateService: ProductTemplateService,
  ) {}
  @UseInterceptors(new BunnyUploadInterceptor())
  @Post()
  async create(@Body() dto: ProductTemplateReqDto, @Req() req) {
    return this.productTemplateService.create(req.fileUrls, dto);
  }

  @Get()
  async findAll(@Query() dto: PageOptionsDto) {
    return this.productTemplateService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productTemplateService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductTemplateReqDto) {
    return this.productTemplateService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.productTemplateService.delete(id);
    return { message: 'Product template deleted successfully' };
  }
}
