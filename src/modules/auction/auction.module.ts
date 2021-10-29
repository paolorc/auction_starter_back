import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';

import { Auction, AuctionSchema } from './schemas/auction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export default class AuctionModule {}
