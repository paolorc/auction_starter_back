import { IsString } from 'class-validator';

export class PublishAuctionDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  category: string;
}
