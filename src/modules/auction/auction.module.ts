import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Auction, AuctionSchema } from './schemas/auction.schema';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import AccountModule from 'modules/account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auction.name, schema: AuctionSchema }]),
    AccountModule,
  ],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export default class AuctionModule {}
