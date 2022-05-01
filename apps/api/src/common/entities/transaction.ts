import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ITransaction } from '@reputable/types';

@ObjectType()
export class Transaction implements ITransaction {
  @Field()
  from: string;
  @Field()
  to: string;
  @Field(() => Int)
  amount: number;
}
