import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductVariantValueReqDto } from './product-variant-value.req';

export class ProductVariantAttributeReqDto {
  @IsString()
  name: string; // Example: "Color", "Size"

  @IsOptional()
  @IsArray()
  values?: ProductVariantValueReqDto[]; // Assuming values are represented as an array of strings (e.g., ["Red", "Blue"])
}

