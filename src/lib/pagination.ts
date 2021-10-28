import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Max, Min } from 'class-validator';

const MIN_PAGES_COUNT = 1;
const MAX_ROWS_COUNT = 25;
const DEFAULT_LIMIT_PAGINATION = 25;
const DEFAULT_PAGE_PAGINATION = 1;

export class Pagination<T> {
  public totalPages = 0;

  constructor(
    public items: T[],
    public totalCount: number,
    public page: number = DEFAULT_PAGE_PAGINATION,
    public limit: number = DEFAULT_LIMIT_PAGINATION,
  ) {
    return this.withTotalPages();
  }

  private withTotalPages() {
    const _totalCount = this.totalCount === 0 ? this.limit : this.totalCount;
    this.page = _totalCount <= this.limit ? MIN_PAGES_COUNT : this.page;
    this.totalPages = Math.ceil(_totalCount / this.limit);

    return this;
  }
}

export class PaginatedDTO {
  @IsOptional()
  @Min(MIN_PAGES_COUNT)
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number = DEFAULT_PAGE_PAGINATION;

  @IsOptional()
  @Max(MAX_ROWS_COUNT)
  @IsPositive()
  @Transform(({ value }) => Number(value))
  limit: number = DEFAULT_LIMIT_PAGINATION;
}
