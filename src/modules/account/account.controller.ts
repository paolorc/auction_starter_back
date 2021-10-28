import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AccountService } from './account.service';
import { Auth } from './decorators/auth.decorator';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { Account } from './schemas/account.schema';
import { LoginDTO } from './types/dto/login.dto';

@Controller('account')
@UseInterceptors(ClassSerializerInterceptor)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/login')
  login(@Body() credentials: LoginDTO) {
    return this.accountService.login(credentials.email, credentials.password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  me(@Auth() account: Account) {
    return account;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.accountService.findById(id);
  }
}
