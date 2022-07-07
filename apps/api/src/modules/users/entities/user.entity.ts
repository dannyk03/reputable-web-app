import { ObjectType, Field, GraphQLISODateTime, Int } from '@nestjs/graphql';
import type {
  IUserMetadata,
  IAppMetadata,
  ITip,
  IUser,
} from '@reputable/types';
import { Tip } from '../../../common/entities/tip';

@ObjectType()
export class UserMetaData implements IUserMetadata {
  @Field(() => Int)
  tokens?: number;

  @Field(() => [Tip], { nullable: true, defaultValue: [] })
  tips?: ITip[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  communities?: string[];

  @Field(() => String, { nullable: true, defaultValue: null })
  address?: string;
}

@ObjectType()
export class AppMetaData implements IAppMetadata {
  @Field({ nullable: true })
  isApproved?: boolean;

  @Field({ nullable: true })
  role?: 'admin';
}

@ObjectType()
export class User implements IUser {
  @Field(() => GraphQLISODateTime, { nullable: true })
  created_at: Date;

  @Field({ nullable: true })
  email: string;

  @Field(() => Boolean, { nullable: true })
  email_verified: boolean;

  @Field({ nullable: true })
  picture: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  user_id: string;

  @Field(() => UserMetaData, { nullable: true })
  user_metadata?: UserMetaData;

  @Field(() => AppMetaData, { nullable: true })
  app_metadata?: AppMetaData;

  @Field(() => Int, { nullable: true })
  experiments_count?: number;

  @Field({ nullable: true })
  last_login: string;
}
