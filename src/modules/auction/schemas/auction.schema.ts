import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';

import { Account } from 'modules/account/schemas/account.schema';
import { AuctionStatus } from '../types/enum/auctionStatus';

export type AuctionDocument = Auction & mongoose.Document;

@Schema({ timestamps: true })
export class Auction {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  @Type(() => Account)
  owner: Account;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }] })
  @Type(() => Account)
  appliers: Account[];

  @Prop({ default: true })
  showcased: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  @Type(() => Account)
  winner: Account;

  @Prop({ type: 'timestamp' })
  finishedAt: Date;

  @Prop({ type: 'enum', enum: AuctionStatus, default: AuctionStatus.Active })
  status: AuctionStatus;
}

const AuctionSchema = SchemaFactory.createForClass(Auction);

AuctionSchema.virtual('owner', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'owner',
});

AuctionSchema.virtual('winner', {
  ref: 'Account',
  localField: '_id',
  foreignField: 'winner',
});

export { AuctionSchema };
