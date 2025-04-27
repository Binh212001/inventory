// create-category.dto.ts
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsInt()
  @IsOptional()
  parentId?: number;
}
