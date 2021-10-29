import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

import { AccountStatus } from '../types/enum/accountStatus';

export interface IAccount extends Document {
  firstName: string;
  lastName: string;
  fullName: string;
  password?: string;
  profile: {
    about: string;
    email: string;
    phone?: string;
    address?: string;
    needs?: string;
  };
  status: AccountStatus;
}

export class Profile {
  @Prop()
  about: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  needs: string;
}

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Account {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;

  @Prop({ type: Profile })
  profile: Profile;

  @Prop({ enum: AccountStatus, default: AccountStatus.Active })
  status: AccountStatus;
}

const AccountSchema = SchemaFactory.createForClass(Account);

export type ProfileDocument = Profile & Document;
export type AccountDocument = Account & Document;
export { AccountSchema };
