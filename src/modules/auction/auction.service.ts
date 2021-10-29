import { Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import AppLog from 'logger/logger.service';
import { Account, IAccount } from 'modules/account/schemas/account.schema';

import { Auction, IAuction } from './schemas/auction.schema';
import { AuctionDTO } from './types/dto/fetchAuction.dto';
import { PublishAuctionDTO } from './types/dto/publish.dto';
import { UnpublishAuctionDTO } from './types/dto/unpublish.dto';
import { AuctionStatus } from './types/enum/auctionStatus';

@Injectable()
export class AuctionService {
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
    @InjectModel('Auction') private readonly auctionModel: Model<Auction>,
    private log: AppLog,
  ) {
    this.log.setContext(AuctionService.name);
  }

  /**
   * Publish a new auction
   */
  async publish(account: Account, data: PublishAuctionDTO) {
    this.log.debug(`new auction, account: ${account._id}`);

    const listing = await new this.auctionModel({
      ...data,
      owner: account,
    }).save();

    return listing.toJSON();
  }

  /**
   * Unpublish an Active auction
   */
  async unpublish(account: Account, { auctionId }: UnpublishAuctionDTO) {
    this.log.debug(`unpublish, account: ${account._id}, auction; ${auctionId}`);

    const listing = await this.auctionModel.findById(auctionId).exec();

    if (!listing) {
      throw new Error('Not found');
    }

    await this.auctionModel.findByIdAndUpdate(
      auctionId,
      {
        showcased: false,
        status: AuctionStatus.Disabled,
      },
      { new: true, lean: true },
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
      ...(params.winners ? { winner: { $exists: true } } : {}),
    };

    return this.auctionModel
      .find(filters)
      .sort({ createdAt: -1 })
      .populate('owner')
      .populate('winner')
      .lean()
      .exec();
  }

  fetchAllByAccount(account: Account, params: AuctionDTO) {
    console.log(params);
    const status = params.status
      ? [params.status]
      : [AuctionStatus.Active, AuctionStatus.Finished];

    const filters = {
      owner: account,
      showcased: params.showcased,
      status: {
        $in: status,
      },
      ...(params.applied ? { appliers: { $in: [account] } } : {}),
    };

    return this.auctionModel
      .find(filters)
      .sort({ createdAt: -1 })
      .populate('winner')
      .lean()
      .exec();
  }

  fetchById(id: string) {
    return this.auctionModel
      .findById(id)
      .populate('owner')
      .populate('winner')
      .lean()
      .exec();
  }

  async update(account: Account, auctionId: string, data: Partial<IAuction>) {
    this.log.debug(
      `patch, account: ${account._id}, auction title; ${data.title}`,
    );

    const listing = await this.auctionModel
      .findById(auctionId)
      .populate('owner')
      .exec();

    if (!listing) {
      throw new Error('Not found');
    }

    for (const prop in data) {
      listing[prop] = data[prop];
    }

    return this.auctionModel.findByIdAndUpdate(auctionId, listing, {
      new: true,
      lean: true,
    });
  }

  async setWinner(account: Account, auctionId: string, winnerId: string) {
    this.log.debug(
      `set winner, account: ${account._id}, winnerId; ${winnerId}, auctionId: ${auctionId}`,
    );

    const listing = await this.auctionModel
      .findById(auctionId)
      .populate('owner')
      .exec();

    if (!listing) {
      throw new Error('Not found');
    }

    const winner = await this.accountModel.findById(winnerId).exec();

    return this.auctionModel.findByIdAndUpdate(
      auctionId,
      {
        winner,
        status: AuctionStatus.Finished,
      },
      { new: true, lean: true },
    );
  }

  validateListing(listing: Auction) {
    if (!listing || listing.status !== AuctionStatus.Active) {
      throw new Error('Not processable');
    }
  }

  async apply(account: Account, auctionId: string) {
    this.log.debug(
      `applying, account: ${account._id}, auctionId: ${auctionId}`,
    );

    const listing = await this.auctionModel
      .findById(auctionId)
      .populate('owner')
      .exec();

    this.validateListing(listing);

    return this.auctionModel.findByIdAndUpdate(
      auctionId,
      {
        $push: { appliers: account._id },
      },
      { new: true, lean: true },
    );
  }

  async discard(account: Account, auctionId: string) {
    this.log.debug(
      `discarding, account: ${account._id}, auctionId: ${auctionId}`,
    );

    const listing = await this.auctionModel
      .findById(auctionId)
      .populate('owner')
      .exec();

    this.validateListing(listing);

    return this.auctionModel.findByIdAndUpdate(
      auctionId,
      {
        $pull: {
          appliers: account._id,
        },
      },
      { new: true, lean: true },
    );
  }
}
