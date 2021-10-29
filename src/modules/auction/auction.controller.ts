import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Auth } from 'modules/account/decorators/auth.decorator';
import { JwtAuthGuard } from 'modules/account/guards/jwtAuth.guard';
import { Account, IAccount } from 'modules/account/schemas/account.schema';
import { AuctionService } from './auction.service';
import { IAuction } from './schemas/auction.schema';
import { AuctionDTO } from './types/dto/fetchAuction.dto';
import { PublishAuctionDTO } from './types/dto/publish.dto';
import { UnpublishAuctionDTO } from './types/dto/unpublish.dto';

@Controller('auctions')
@UseInterceptors(ClassSerializerInterceptor)
export class AuctionController {
  constructor(private readonly auctionService: AuctionService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post('/publish')
  publish(@Auth() account: Account, @Body() data: PublishAuctionDTO) {
    return this.auctionService.publish(account, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Post('/unpublish')
  unpublish(@Auth() account: Account, @Body() data: UnpublishAuctionDTO) {
    return this.auctionService.unpublish(account, data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch('/:auctionId')
  update(
    @Auth() account: Account,
    @Param('auctionId') auctionId: string,
    @Body() data: IAuction,
  ) {
    return this.auctionService.update(account, auctionId, data);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/')
  fecthAll(@Auth() account: Account, @Query() params: AuctionDTO) {
    return this.auctionService.fetchAll(params, account);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  fetchAllByAccount(@Auth() account: IAccount, @Query() params: AuctionDTO) {
    return this.auctionService.fetchAllByAccount(account._id, params);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('/:auctionId')
  findById(@Param('auctionId') auctionId: string) {
    return this.auctionService.fetchById(auctionId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('/:auctionId/winner')
  setWinner(
    @Auth() account: Account,
    @Param('auctionId') auctionId: string,
    @Body() data: { winnerId: string },
  ) {
    return this.auctionService.setWinner(account, auctionId, data.winnerId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('/:auctionId/apply')
  apply(@Auth() account: Account, @Param('auctionId') auctionId: string) {
    return this.auctionService.apply(account, auctionId);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('/:auctionId/discard')
  discard(@Auth() account: Account, @Param('auctionId') auctionId: string) {
    return this.auctionService.discard(account, auctionId);
  }
}
