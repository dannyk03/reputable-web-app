import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';
import { plainToClass } from 'class-transformer';
import { FilterQuery } from 'mongoose';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PopulatedComment } from '@reputable/types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentsModel: ReturnModelType<typeof Comment>,
    private usersService: UsersService
  ) {}

  async create(commentData: CreateCommentInput) {
    return this.commentsModel
      .create(commentData)
      .then((comment) => plainToClass(Comment, comment.toJSON()));
  }

  query(selector: FilterQuery<Comment>) {
    return this.commentsModel
      .find(selector)
      .populate('replies')
      .lean()
      .exec()
      .then(async (comments: Comment[]): Promise<PopulatedComment[]> => {
        // Get all different users
        const userEmails = new Set()
        const emailToUser: Record<string,User> = {}
        comments.map(comment=>{
          userEmails.add(comment.author);
          (comment.replies || []).map((reply)=>userEmails.add(reply.author))
        })
        console.log('will retrieve')
        console.log('emailToUser',emailToUser)
        await Promise.all(Array.from(userEmails).map((email:string)=>this.usersService.findOne(email).then(user=>emailToUser[user.email] = user)))
        console.log('Retrieved users')
        return comments.map((comment)=>{
          return {
            ...comment,
            author: emailToUser[comment.author],
            replies: comment.replies.map(r=>({
              ...r,
              author: emailToUser[r.author]
            }))
          }
        })
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
      .exec();
  }

  remove(_id: string) {
    return this.commentsModel.findOneAndRemove().orFail().exec();
  }
}
