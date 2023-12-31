import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CurrentUser, Public } from 'src/decorators';
import { MessageResponse } from 'src/common/entities/response';
import { User, UserMetaData } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => MessageResponse)
  createComment(
    @CurrentUser() user: User,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    if (!user.app_metadata.isApproved)
      throw new UnauthorizedException(
        'You have to be an approved user to create an experiment',
      );
    return this.commentsService
      .create({ ...createCommentInput, author: user.email })
      .then((r) => {
        return {
          message: 'Created comment',
        };
      });
  }

  @Public()
  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentsService.findAll();
  }

  @Public()
  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('_id') _id: string) {
    return this.commentsService.findOne(_id);
  }

  @Mutation(() => MessageResponse)
  updateComment(
    @Args('_id') _id: string,
    @Args('comment') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(_id, updateCommentInput).then((r) => ({
      message: 'Updated comment!',
    }));
  }

  @Mutation(() => MessageResponse)
  removeComment(@Args('_id') _id: string, @CurrentUser() user: User) {
    if (!user.app_metadata.isApproved)
      throw new UnauthorizedException(
        'You have to be an approved user to create an experiment',
      );
    return this.commentsService.remove(_id).then(() => ({
      message: 'Removed comment!',
    }));
  }
}
