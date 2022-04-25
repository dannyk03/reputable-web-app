import { ObjectType, Field, ID } from '@nestjs/graphql';
import { index, prop, DocumentType, buildSchema } from '@typegoose/typegoose';
import { BaseMongoEntity } from '../../../common/entities/mongo';
import { TransformQueries } from '../../../decorators';
import { IComment } from 'types';

@ObjectType({ description: 'Comment' })
@TransformQueries(Comment)
@index({ author: 1 })
@index({ replyTo: 1 })
export class Comment extends BaseMongoEntity implements IComment {
  @Field()
  @prop({ required: true })
  author: string;
  @Field(() => ID, { nullable: true })
  @prop({ ref: () => Comment })
  replyTo?: string;
  @Field()
  @prop({ required: true })
  text: string;
  @Field(() => ID, { nullable: true })
  @prop({ ref: 'Experiment' })
  experiment: string;
  @Field(() => [Comment], { nullable: true })
  @prop({ ref: () => 'Comment', localField: '_id', foreignField: 'replyTo' })
  replies?: Comment[];
}

export type CommentDocument = DocumentType<Comment>;

export const CommentSchema = buildSchema(Comment);
