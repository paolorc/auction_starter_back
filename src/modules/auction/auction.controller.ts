import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Response,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'modules/account/decorators/auth.decorator';
import { JwtAuthGuard } from 'modules/account/guards/jwtAuth.guard';
import { Account, IAccount } from 'modules/account/schemas/account.schema';
import { AuctionService } from './auction.service';
import { AuctionDTO } from './types/dto/fetchAuction.dto';
import { PublishAuctionDTO } from './types/dto/publish.dto';
import { UnpublishAuctionDTO } from './types/dto/unpublish.dto';

// import { Account } from 'modules/account/entities/account.entity';
// import { AccountRoles } from 'modules/account/types/enum/roles';
// import { Auth } from 'modules/account/decorators/auth.decorator';
// import { JwtAuthGuard } from 'modules/account/guards/jwtAuth.guard';
// import { Roles } from 'modules/account/decorators/roles.decorator';
// import { RolesGuard } from 'modules/account/guards/roles.guard';

// import { InvoiceService } from './invoice.service';
// import { InvoicesDTO } from './types/dto/invoices.dto';
// import { NewInvoiceDTO } from './types/dto/newInvoice.dto';

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
  @Get('/')
  findAll(@Query() params: AuctionDTO) {
    return this.auctionService.fetchAll(params);
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

  // @HttpCode(HttpStatus.CREATED)
  // @Roles(AccountRoles.Admin)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Post('/csv')
  // async createCSV(@Response() res: ExpressResponse) {
  //   const invoiceCSV = await this.invoiceService.makeCSV();
  //   res.header('Content-disposition', 'attachment; filename=invoices.csv');
  //   res.header('Content-Type', 'text/csv');
  //   return res.send(invoiceCSV);
  // }
}
