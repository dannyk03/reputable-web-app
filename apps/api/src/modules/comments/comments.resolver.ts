import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Public } from 'src/decorators';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
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

  @Mutation(() => Comment)
  updateComment(
    @Args('_id') _id: string,
    @Args('comment') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.update(_id, updateCommentInput);
  }

  @Mutation(() => Comment)
  removeComment(@Args('_id') _id: string) {
    return this.commentsService.remove(_id);
  }
}
