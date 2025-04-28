import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductVariantReqDto } from './product-variant.req';
import { Transform } from 'class-transformer';

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
  @IsArray()
  variants?: ProductVariantReqDto[]; // Assuming variants are represented by their IDs
}
