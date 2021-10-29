import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import AccountModule from 'modules/account/account.module';
import ConfigModule from 'config/config.module';
import LoggerModule from 'logger/logger.module';
import AuctionModule from 'modules/auction/auction.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    MongooseModule.forRoot(process.env.DB_SRV),
    AccountModule,
    AuctionModule,
  ],
})
export default class AppModule {}
