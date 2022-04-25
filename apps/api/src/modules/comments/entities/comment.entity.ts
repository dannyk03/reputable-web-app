import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  index,
  prop,
  DocumentType,
  buildSchema,
  Ref,
} from '@typegoose/typegoose';
import { BaseMongoEntity } from '../../../common/entities/mongo';
import { Experiment } from '../../../modules/experiments/entities/experiment.entity';
import { TransformQueries } from 'src/decorators';

@ObjectType({ description: 'Comment' })
@TransformQueries(Comment)
@index({ author: 1 })
@index({ replyTo: 1 })
export class Comment extends BaseMongoEntity {
  @Field()
  @prop({ required: true })
  author: string;
  @Field(() => ID, { nullable: true })
  @prop({ ref: () => Comment })
  replyTo?: Ref<Comment>;
  @Field()
  @prop({ required: true })
  text: string;
  @Field(() => ID, { nullable: true })
  @prop({ ref: 'Experiment' })
  experiment: Ref<Experiment>;
  @Field(() => [Comment], { nullable: true })
  @prop({ ref: () => 'Comment', localField: '_id', foreignField: 'replyTo' })
  replies?: Ref<Comment>[];
}

export type CommentDocument = DocumentType<Comment>;

export const CommentSchema = buildSchema(Comment);
