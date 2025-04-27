import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductVariantReqDto } from './product-variant.req';

export class ProductTemplateReqDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsArray()
  variants?: ProductVariantReqDto[]; // Assuming variants are represented by their IDs
}
