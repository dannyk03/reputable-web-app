import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  Int,
  ID,
} from '@nestjs/graphql';

@ObjectType()
export class BaseMongoEntity {
  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => ID)
  _id: string;
}
