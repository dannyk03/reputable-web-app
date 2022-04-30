import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Tip } from '../../../common/entities/tip';
import { IUser } from '@reputable/types';

@ObjectType()
export class UserMetaData {
  @Field(() => [Tip])
  tips?: Tip[];
}

@ObjectType()
export class User implements IUser {
  @Field(() => GraphQLISODateTime)
  created_at: Date;
  @Field()
  email: string;
  @Field(() => Boolean)
  email_verified: boolean;
  @Field()
  picture: string;
  @Field()
  name: string;
  @Field()
  user_id: string;
}
