import { Expose } from 'class-transformer';
import { PageOptionsDto } from './page-options.dto';

export class OffsetPaginationDto {
  @Expose()
  readonly limit: number;

  @Expose()
  readonly currentPage: number;

  @Expose()
  readonly nextPage?: number;

  @Expose()
  readonly previousPage?: number;

  @Expose()
  readonly totalRecords: number;

  @Expose()
  readonly totalPages: number;

  constructor(totalRecords: number, pageOptions: PageOptionsDto) {
    this.limit = pageOptions.limit ?? 10;
    this.currentPage = pageOptions.page ?? 1;
    this.totalRecords = totalRecords;
    this.totalPages =
      this.limit > 0 ? Math.ceil(totalRecords / (pageOptions.limit ?? 10)) : 0;
    this.nextPage =
      this.currentPage < this.totalPages ? this.currentPage + 1 : undefined;
    this.previousPage =
      this.currentPage > 1 && this.currentPage - 1 < this.totalPages
        ? this.currentPage - 1
        : undefined;
  }
}
