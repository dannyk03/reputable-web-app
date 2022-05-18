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
import { CurrentUser, Public } from 'src/decorators';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { instanceToPlain } from 'class-transformer';
import { CommunitiesService } from '../communities/communities.service';
import { Community } from '../communities/entities/community.entity';
import { MessageResponse } from 'src/common/entities/response';

@Resolver(() => Experiment)
export class ExperimentsResolver {
  constructor(
    private readonly experimentsService: ExperimentsService,
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
  ) {}

  @Mutation(() => Experiment)
  createExperiment(
    @Args('experiment') createExperimentInput: CreateExperimentInput,
  ) {
    return this.experimentsService.create(createExperimentInput);
  }

  @Public()
  @Query(() => [Experiment], { name: 'experiments' })
  findAll(
    @Args('community', { type: () => String, nullable: true })
    community?: string,
  ) {
    return this.experimentsService.query({ communities: community });
  }

  @Public()
  @Query(() => Experiment, { name: 'experiment' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.experimentsService.findOne(_id);
  }

  @ResolveField('comments', (returns) => [Comment])
  async getComments(@Parent() experiment: Experiment) {
    console.log('experimentId', experiment._id);
    return this.commentsService.loaderForExperiments.load(experiment._id);
  }

  @ResolveField('createdBy', (returns) => User)
  getUser(@Parent() experiment: Experiment) {
    return this.usersService.loaderForExperiments.load(experiment.createdBy);
  }

  @Public()
  @ResolveField('communities', (returns) => [Community])
  getCommunities(@Parent() experiment: Experiment) {
    return this.communitiesService.loaderForExperiments.loadMany(
      experiment.communities,
    );
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

  @Mutation(() => MessageResponse)
  tipExperiment(
    @Args('tip', { type: () => Int }) tip: number,
    @Args('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.experimentsService.tipExperiment(id, user, tip);
  }
}
