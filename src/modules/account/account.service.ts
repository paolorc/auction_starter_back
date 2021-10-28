import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

// import { Product } from './interfaces/product.interface';
// import { CreateProductDTO } from './dto/product.dto';
import { Account, IAccount } from './schemas/account.schema';
import { IJWTPayload } from './types/interface/jwtPayload';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // TODO: Implement real validation by encryption of password and hashing
    const account = await this.findByEmail(email);
    if (account.password !== password) {
      throw new Error('Invalid Account');
    }
    return {
      account: {
        firstName: account.firstName,
        lastName: account.lastName,
        profile: account.profile,
      },
      accessToken: this.generateAccessToken(account.profile.email),
    };
  }

  generateAccessToken(email: string) {
    const payload: IJWTPayload = { email };

    return this.jwtService.sign(payload);
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.accountModel.findOne({ email }).lean();

    if (!account) {
      throw new Error('Invalid Account');
    }

    return account;
  }
}
