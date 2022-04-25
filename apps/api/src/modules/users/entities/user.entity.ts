import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { IUser } from 'types';

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
}
