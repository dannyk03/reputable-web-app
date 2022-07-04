import { Field, Int, ObjectType } from '@nestjs/graphql';
import type { ITip } from '@reputable/types';
import { prop } from '@typegoose/typegoose';

@ObjectType()
export class Tip implements ITip {
  @Field()
  @prop({ required: true })
  userId: string;

  @Field(() => Int)
  @prop({ required: true })
  amount: number;
}
