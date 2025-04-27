import { IsString } from 'class-validator';

export class ProductVariantValueReqDto {
    @IsString()
    value: string; // Example: "Red", "Blue", "Large", "Small"
  }