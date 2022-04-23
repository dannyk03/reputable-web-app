import {
  ObjectType,
  Field,
  GraphQLISODateTime,
  Int,
  ID,
} from '@nestjs/graphql';
import { Expose, Exclude, Transform } from 'class-transformer';

@ObjectType()
export class BaseMongoEntity {
  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => ID)
  @Expose()
  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
  @Transform((value) => {
    if ('value' in value) {
      // HACK: this is changed because of https://github.com/typestack/class-transformer/issues/879
      // return value.value.toString(); // because "toString" is also a wrapper for "toHexString"
      return value.obj[value.key].toString();
    }

    return 'unknown value';
  })
  _id: string;
}
