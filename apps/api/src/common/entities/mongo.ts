import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  Int,
  ID,
} from '@nestjs/graphql';

export class BaseMongoEntity {
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => ID)
  _id: string;

  @Field(() => Int)
  __v?: number;
}
