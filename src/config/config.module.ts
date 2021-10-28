import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';

import httpConfig from './services/http';
import jwtConfig from './services/jwt';
import mongodbConfig from './services/mongodb';

@Module({
  imports: [
    _ConfigModule.forRoot({
      load: [httpConfig, jwtConfig, mongodbConfig],
      isGlobal: true,
    }),
  ],
})
export default class ConfigModule {}
