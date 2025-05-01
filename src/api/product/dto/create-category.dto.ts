// create-category.dto.ts
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;
  @Type(() => File)
  @IsOptional()
  image: File;

  @IsInt()
  @IsOptional()
  parentId?: string;
}
