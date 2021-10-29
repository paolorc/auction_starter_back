import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

import { PaginatedDTO } from 'lib/pagination';
import { AuctionStatus } from '../enum/auctionStatus';

export class AuctionDTO extends PaginatedDTO {
  @IsOptional()
  @IsEnum(AuctionStatus)
  status: AuctionStatus;

  @IsOptional()
  @IsBoolean()
  @Transform((type) => Boolean(type))
  showcased: boolean = true;
}
