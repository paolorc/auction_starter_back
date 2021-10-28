import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Auction, AuctionSchema } from './schemas/auction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
  ],
})
export default class AuctionModule {}
