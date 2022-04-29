import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ExperimentsService } from './experiments.service';
import { Experiment } from './entities/experiment.entity';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Public } from 'src/decorators';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';
import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/common/helpers';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Resolver(() => Experiment)
export class ExperimentsResolver {
  private commentsLoader: DataLoader<string, Comment>;
  private usersLoader: DataLoader<string, User>;
  constructor(
    private readonly experimentsService: ExperimentsService,
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {
    this.commentsLoader = new DataLoader<string, Comment>(async (_ids) => {
      const comments = await commentsService.query({
        experiment: { $in: _ids },
      });
      const commentsMap = mapFromArray<Comment>(
        comments,
        (c) => c.experiment as string,
      );
      return _ids.map((_id) => commentsMap[_id]);
    });
    this.usersLoader = new DataLoader<string, User>(async (emails) => {
      const users = await Promise.all(
        emails.map((email) => usersService.findOne(email)),
      );
      const usersMap = mapFromArray<User>(users, (u) => u.email);
      return emails.map((email) => usersMap.get(email));
    });
  }

  @Mutation(() => Experiment)
  createExperiment(
    @Args('experiment') createExperimentInput: CreateExperimentInput,
  ) {
    return this.experimentsService.create(createExperimentInput);
  }

  @Public()
  @Query(() => [Experiment], { name: 'experiments' })
  findAll() {
    return this.experimentsService.findAll();
  }

  @Public()
  @Query(() => Experiment, { name: 'experiment' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.experimentsService.findOne(_id);
  }

  @ResolveField('comments', (returns) => [Comment])
  getComments(@Parent() experiment: Experiment) {
    return this.commentsLoader.load(experiment._id);
  }

  @ResolveField('createdBy', (returns) => User)
  getUser(@Parent() experiment: Experiment) {
    return this.usersLoader.load(experiment.createdBy);
  }

  @Mutation(() => Experiment)
  updateExperiment(
    @Args('_id') experimentId: string,
    @Args('experiment') updateExperimentInput: UpdateExperimentInput,
  ) {
    return this.experimentsService.update(experimentId, updateExperimentInput);
  }

  @Mutation(() => Experiment)
  removeExperiment(@Args('id', { type: () => Int }) id: number) {
    return this.experimentsService.remove(id);
  }
}
