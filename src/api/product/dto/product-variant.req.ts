import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductVariantAttributeReqDto } from './product-variant-attribute.req';

export class ProductVariantReqDto {
    @IsString()
    sku: string;
  
    @IsNumber()
    stockQuantity: number;
  
    @IsBoolean()
    isAvailable: boolean;
  
    @IsOptional()
    @IsNumber()
    attributes?: ProductVariantAttributeReqDto[]; 
  }
  
  