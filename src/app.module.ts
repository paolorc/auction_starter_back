import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import AccountModule from 'modules/account/account.module';
import ConfigModule from 'config/config.module';
import LoggerModule from 'logger/logger.module';

@Module({
  imports: [
    AccountModule,
    ConfigModule,
    LoggerModule,
    MongooseModule.forRoot(process.env.DB_SRV),
  ],
})
export default class AppModule {}
