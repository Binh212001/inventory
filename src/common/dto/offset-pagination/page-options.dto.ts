import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OffsetPaginationDto } from './offset-pagination.dto';

export class PageOptionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => String)
  @IsString()
  q: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  takeAll: boolean = false;

  get offset(): number {
    return (this.page > 0 ? this.page - 1 : 0) * this.limit;
  }

  async meta(repo: {
    count: () => Promise<number>;
  }): Promise<OffsetPaginationDto> {
    const totalRecords = await repo.count();
    return {
      limit: this.limit,
      currentPage: this.page,
      totalRecords,
      totalPages: Math.ceil(totalRecords / this.limit),
    };
  }
}
