import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AccountService } from '../account.service';
import { Account } from '../schemas/account.schema';
import { IJWTPayload } from '../types/interface/jwtPayload';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly accountService: AccountService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  validate(payload: IJWTPayload): Promise<Account> {
    return this.accountService.findByEmail(payload.email);
  }
}
