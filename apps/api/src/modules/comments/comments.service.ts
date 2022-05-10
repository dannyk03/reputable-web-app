import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment, CommentDocument } from './entities/comment.entity';
import { plainToClass } from 'class-transformer';
import { FilterQuery } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PopulatedComment } from '@reputable/types';
import * as DataLoader from 'dataloader';
import { makeArray, mapFromArray } from '../../common/helpers';

@Injectable()
export class CommentsService {
  public loaderForExperiments = new DataLoader<string, PopulatedComment[]>(async (_ids) => {
    const comments = await this.query({
      // Since we convert everything with class-transformer, we need to
      // convert _ids back to ObjectId type.
      // Mongoose will not automatically inherit type for $in operator.
      experiment: { $in: _ids },
      replyTo: { $eq: null },
    });
    const commentsMap = mapFromArray<PopulatedComment>(
      comments,
      (c) => c.experiment as string,
    );
    return _ids.map((_id) => makeArray(commentsMap.get(_id)));
  });
  constructor(
    @InjectModel(Comment.name)
    private commentsModel: ReturnModelType<typeof Comment>,
    private usersService: UsersService,
  ) {}

  async create(commentData: CreateCommentInput) {
    return this.commentsModel
      .create(commentData)
      .then((comment) => {
        this.loaderForExperiments.clearAll();
        plainToClass(Comment, comment.toJSON())
      });
  }

  query(selector: FilterQuery<Comment>) {
    return this.commentsModel
      .find(selector)
      .populate('replies')
      .lean()
      .exec()
      .then(async (comments: Comment[]): Promise<PopulatedComment[]> => {
        // Get all different users
        const userEmails = new Set();
        const emailToUser: Record<string, User> = {};
        comments.map((comment) => {
          userEmails.add(comment.author);
          (comment.replies || []).map((reply) => userEmails.add(reply.author));
        });
        await Promise.all(
          Array.from(userEmails).map((email: string) =>
            this.usersService
              .findOne(email)
              .then((user) => (emailToUser[user.email] = user)),
          ),
        );
        return comments.map((comment) => {
          return {
            ...comment,
            author: emailToUser[comment.author],
            replies: comment.replies.map((r) => ({
              ...r,
              author: emailToUser[r.author],
            })),
          };
        });
      });
  }

  findAll() {
    return this.commentsModel
      .find({})
      .populate('replies')
      .lean()
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
      .exec().then((comment: any)=>{
        this.loaderForExperiments.clear(comment.experiment)
      });
  }

  remove(_id: string) {
    return this.commentsModel.findByIdAndRemove(_id).orFail().exec().then(()=>{
      this.loaderForExperiments.clearAll()
    })
  }
}
