import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductVariantReqDto } from './product-variant.req';
import { Transform } from 'class-transformer';
import { ProductStatus } from '../enums/product-status.enum';
import { Stock } from '../enums/stock.enum';

export class ProductTemplateReqDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  sku: string;

  @IsOptional()
  @IsString()
  barcode: string;

  @IsOptional()
  @IsEnum(() => Stock)
  stock: Stock;

  @IsOptional()
  @IsEnum(() => ProductStatus)
  status: ProductStatus;

  @IsOptional()
  @IsArray()
  variants?: ProductVariantReqDto[]; // Assuming variants are represented by their IDs
}
