import { ObjectType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';
import { IUser } from '@reputable/types';
import { Transaction } from 'src/common/entities/transaction';
import { IUserMetadata } from '@reputable/types';
import { Experiment } from 'src/modules/experiments/entities/experiment.entity';

@ObjectType()
export class UserMetaData implements IUserMetadata {
  @Field(() => Int)
  tokens?: number;
  @Field(() => Transaction, { nullable: true, defaultValue: [] })
  transactions?: Transaction[];
  @Field(() => [String], { nullable: true, defaultValue: [] })
  communities?: string[];
}

@ObjectType()
export class User implements IUser {
  @Field(() => GraphQLISODateTime)
  created_at: Date;
  @Field()
  email: string;
  @Field(() => Boolean)
  email_verified: boolean;
  @Field({ nullable: true })
  picture: string;
  @Field()
  name: string;
  @Field()
  user_id: string;
  @Field(() => UserMetaData, { nullable: true })
  user_metadata?: UserMetaData;
  @Field(() => [Experiment], { nullable: true })
  experiments?: Experiment[];
  @Field()
  last_login: string;
}
