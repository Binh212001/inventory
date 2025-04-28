import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsInt,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class QuotationReq {
  @IsUUID()
  customerId: string;

  @ValidateNested({ each: true })
  @Type(() => QuotationItemDto)
  @ArrayMinSize(1)
  items: QuotationItemDto[];
}

export class QuotationItemDto {
  @IsUUID()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;
}
