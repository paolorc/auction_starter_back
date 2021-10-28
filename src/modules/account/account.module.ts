import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AccountController } from './account.controller';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountService } from './account.service';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get<JwtModuleOptions>('jwt'),
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, JWTStrategy],
})
export default class AccountModule {}
