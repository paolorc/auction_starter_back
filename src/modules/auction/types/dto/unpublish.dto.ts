import { IsString } from 'class-validator';

export class UnpublishAuctionDTO {
  @IsString()
  auctionId: string;
}
