import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CurrentUser, Public } from 'src/decorators';
import { MessageResponse } from 'src/common/entities/response';
import { User, UserMetaData } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { makeArray } from 'src/common/helpers';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {}

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

  @Mutation(() => MessageResponse)
  approveComment(@Args('_id') _id: string, @CurrentUser() user: User) {
    if (!user.app_metadata.isApproved)
      throw new UnauthorizedException(
        'You have to be an approved user to create an experiment',
      );

    return this.commentsService.approveComment(_id, user).then(() => ({
      message: 'Approved comment!',
    }));
  }

  @ResolveField('approvedBy', (returns) => User, { nullable: true })
  async getUser(@Parent() comment: Comment) {
    // Auth0 treats same emails as different accounts if they are
    // registered using different identity providers e.g. GAuth and Username-Pass
    // see the link: https://community.auth0.com/t/duplicate-users-duplicate-emails-as-different-users/18300
    // https://auth0.com/docs/manage-users/user-accounts/user-account-linking/link-user-accounts
    const loadedUsers = await this.usersService.loaderForExperiments.load(
      comment.approvedBy,
    );
    const user = makeArray(loadedUsers)[0];

    return user ?? null;
  }
}
