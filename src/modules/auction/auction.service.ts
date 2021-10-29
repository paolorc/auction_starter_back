import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import AppLog from 'logger/logger.service';
import { Account, IAccount } from 'modules/account/schemas/account.schema';
import { Model } from 'mongoose';
import { filter } from 'rxjs';

import { Auction } from './schemas/auction.schema';
import { AuctionDTO } from './types/dto/fetchAuction.dto';
import { PublishAuctionDTO } from './types/dto/publish.dto';
import { UnpublishAuctionDTO } from './types/dto/unpublish.dto';
import { AuctionStatus } from './types/enum/auctionStatus';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel('Auction') private readonly auctionModel: Model<Auction>,
    private log: AppLog,
  ) {
    this.log.setContext(AuctionService.name);
  }

  /**
   * Publish a new auction
   */
  publish(account: Account, data: PublishAuctionDTO) {
    this.log.debug(`new auction, account: ${account._id}`);
  }

  /**
   * Unpublish an Active auction
   */
  unpublish(account: Account, data: UnpublishAuctionDTO) {
    this.log.debug(
      `unpublish, account: ${account._id}, auction; ${data.auctionId}`,
    );
  }

  fetchAll(params: AuctionDTO) {
    const status = params.status
      ? [params.status]
      : [AuctionStatus.Active, AuctionStatus.Finished];

    const filters = {
      showcased: params.showcased,
      status: {
        $in: status,
      },
    };

    return this.auctionModel
      .find(filters)
      .sort({ createdAt: -1 })
      .populate('owner')
      .populate('winner')
      .lean()
      .exec();
  }

  fetchAllByAccount(account: IAccount, params: AuctionDTO) {
    const status = params.status
      ? [params.status]
      : [AuctionStatus.Active, AuctionStatus.Finished];

    const filters = {
      owner: account._id,
      showcased: params.showcased,
      status: {
        $in: status,
      },
    };

    return this.auctionModel.find(filters).lean().exec();
  }

  fetchById(id: string) {
    return this.auctionModel
      .findById(id)
      .populate('owner')
      .populate('winner')
      .lean()
      .exec();
  }

  update() {}
}
