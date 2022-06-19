import { ObjectType, Field, Int } from '@nestjs/graphql';
import { prop, DocumentType, buildSchema } from '@typegoose/typegoose';
import { BaseMongoEntity } from '../../../common/entities/mongo';
import type { ICommunity } from '@reputable/types';

@ObjectType()
export class Community extends BaseMongoEntity implements ICommunity {
  @Field()
  @prop({ required: true, trim: true })
  name: string;
  @Field()
  @prop({ required: true, trim: true })
  icon: string;
  @Field(() => Int)
  @prop({ required: true, default: 0 })
  memberCount: number;
  @Field()
  @prop({ required: true })
  slug: string;
  @Field()
  @prop({ required: true })
  bgColor: string;
  @Field()
  @prop({ required: true })
  textColor: string;
  @Field()
  @prop({ default: false })
  isPublished?: boolean;
  @Field()
  @prop({ default: false })
  isEnabled?: boolean;
}

export type CommunityDocument = DocumentType<Community>;

export const CommunitySchema = buildSchema(Community);
