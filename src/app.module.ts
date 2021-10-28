import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

import ConfigModule from 'config/config.module';
import LoggerModule from 'logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    // global configuration of the typeorm module, using factory func.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get<MongoConnectionOptions>('mongodb'),
        url: process.env.DB_SRV,
        type: 'mongodb',
        autoLoadEntities: true,
        synchronize: false,
        entities: ['dist/**/*.entity{.ts, .js}'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        debug: false,
      }),
    }),
  ],
})
export default class AppModule {}
