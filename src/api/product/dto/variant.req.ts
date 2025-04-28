import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class VariantAttribute {
  @IsString()
  name: string;

  @Type(() => VariantColor)
  values: VariantColor[];
}
export class VariantColor {
  @IsString()
  value: string;
}
