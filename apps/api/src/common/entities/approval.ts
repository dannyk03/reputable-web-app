import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IApproval } from '@reputable/types';
import { prop } from '@typegoose/typegoose';

@ObjectType()
export class Approval implements IApproval {
  @Field()
  @prop({ required: true })
  commentId: string;

  @Field(() => Int)
  @prop({ required: true })
  amount: number;
}
