import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

import { PaginatedDTO } from 'lib/pagination';
import { AuctionStatus } from '../enum/auctionStatus';

export class AuctionDTO extends PaginatedDTO {
  @IsOptional()
  @IsEnum(AuctionStatus)
  status?: AuctionStatus;

  @IsOptional()
  @IsBoolean()
  @Transform((type) => Boolean(type.value))
  showcased?: boolean = true;

  @IsOptional()
  @IsBoolean()
  @Transform((type) => Boolean(type.value))
  applied?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform((type) => Boolean(type.value))
  winners?: boolean;
}
