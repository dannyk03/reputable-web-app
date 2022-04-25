import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment, CommentDocument } from './entities/comment.entity';
import { plainToClass } from 'class-transformer';
import { FilterQuery } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentsModel: ReturnModelType<typeof Comment>,
  ) {}

  async create(commentData: CreateCommentInput) {
    return this.commentsModel
      .create(commentData)
      .then((comment) => plainToClass(Comment, comment.toJSON()));
  }

  query(selector: FilterQuery<Comment>) {
    return this.commentsModel.find(selector).lean().exec();
  }

  findAll() {
    return this.commentsModel
      .find({})
      .populate('replies')
      .lean({ virtuals: true, getters: true })
      .limit(25)
      .orFail()
      .exec();
  }

  findOne(_id: string) {
    return this.commentsModel
      .findById(_id)
      .populate('replies')
      .select('text')
      .orFail()
      .lean()
      .exec();
  }

  update(_id: string, commentData: UpdateCommentInput) {
    return this.commentsModel
      .updateOne({ _id }, commentData)
      .orFail()
      .lean()
      .exec();
  }

  remove(_id: string) {
    return this.commentsModel.findOneAndRemove().orFail().exec();
  }
}
