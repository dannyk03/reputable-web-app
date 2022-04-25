import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => GraphQLISODateTime)
  created_at: number;
  @Field()
  email: string;
  @Field(() => Boolean)
  email_verified: boolean;
  @Field()
  picture: string;
  @Field()
  name: string;
}
