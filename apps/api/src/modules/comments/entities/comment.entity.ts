import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  index,
  prop,
  DocumentType,
  buildSchema,
  mongoose,
} from '@typegoose/typegoose';
import { BaseMongoEntity } from '../../../common/entities/mongo';
import { DeserializedMongoId, TransformQueries } from '../../../decorators';
import type { IComment } from '@reputable/types';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType({ description: 'Comment' })
@TransformQueries(Comment)
@index({ author: 1 })
@index({ replyTo: 1 })
export class Comment extends BaseMongoEntity implements IComment {
  @Field(() => User, { nullable: true })
  @prop({ required: true })
  author: string;

  @Field(() => ID, { nullable: true })
  @prop({ ref: 'Comment', type: () => mongoose.Types.ObjectId })
  @DeserializedMongoId()
  replyTo?: string;

  @Field({ nullable: true })
  @prop({ required: true })
  text: string;

  @Field(() => ID, { nullable: true })
  @prop({ ref: 'Experiment', type: () => mongoose.Types.ObjectId })
  @DeserializedMongoId()
  experiment: string;

  @Field(() => [Comment], { nullable: true, defaultValue: [] })
  @prop({ ref: 'Comment', localField: '_id', foreignField: 'replyTo' })
  replies?: Comment[];

  @Field(() => Boolean, { defaultValue: false })
  @prop({ default: false })
  isEdited?: boolean;
}

export type CommentDocument = DocumentType<Comment>;

export const CommentSchema = buildSchema(Comment);
