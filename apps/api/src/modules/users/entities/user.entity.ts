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
}

@ObjectType()
export class AppMetaData implements IAppMetadata {
  @Field()
  isApproved?: boolean;
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
  @Field(() => AppMetaData, { nullable: true })
  app_metadata?: AppMetaData;
  @Field(() => Int)
  experiments_count?: number;
  @Field()
  last_login: string;
}
