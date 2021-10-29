import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform, Type } from 'class-transformer';

import { Account } from 'modules/account/schemas/account.schema';
import { AuctionStatus } from '../types/enum/auctionStatus';

export interface IAuction extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  owner: Account;
  appliers: Account[];
  showcased: boolean;
  winner: Account;
  finishedAt?: Date;
  status: AuctionStatus;
  createdAt: Date;
  updatedAt?: Date;
}

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

  @Prop()
  imageUrl?: string;

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

  @Prop()
  finishedAt?: Date;

  @Prop({ enum: AuctionStatus, default: AuctionStatus.Active })
  status: AuctionStatus;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

const AuctionSchema = SchemaFactory.createForClass(Auction);

export type AuctionDocument = Auction & mongoose.Document;
export { AuctionSchema };
