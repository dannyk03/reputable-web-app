import { ObjectType, Field } from '@nestjs/graphql';
import {
  index,
  modelOptions,
  plugin,
  prop,
  DocumentType,
  buildSchema,
} from '@typegoose/typegoose';
import { BaseMongoEntity } from 'src/common/entities/mongo';
import { mongooseLeanGetters, mongooseLeanVirtuals } from '../../../plugins';

@ObjectType()
@ObjectType({ description: 'experiment' })
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  },
})
@plugin(mongooseLeanGetters)
@plugin(mongooseLeanVirtuals)
@index({ author: 1 })
@index({ replyTo: 1 })
export class Comment extends BaseMongoEntity {
  @Field()
  @prop({ required: true })
  author: string;
  @Field()
  @prop()
  replyTo?: boolean;
  @Field()
  @prop({ required: true })
  text: string;
}

export type CommentDocument = DocumentType<Comment>;

export const CommentSchema = buildSchema(Comment);
