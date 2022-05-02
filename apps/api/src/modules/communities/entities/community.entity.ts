import { ObjectType, Field, Int } from '@nestjs/graphql';
import { prop } from '@typegoose/typegoose';
import { BaseMongoEntity } from '../../../common/entities/mongo';
import { ICommunity } from '@reputable/types';

@ObjectType()
export class Community extends BaseMongoEntity implements ICommunity {
  @Field()
  name: string;
  @Field()
  icon: string;
  @Field(() => Int)
  memberCount: number;
  @Field()
  slug: string;
}
