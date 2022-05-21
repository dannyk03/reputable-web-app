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
import { CommunitiesService } from '../communities/communities.service';
import { Community } from '../communities/entities/community.entity';
import { MessageResponse } from 'src/common/entities/response';
import { UnauthorizedException } from '@nestjs/common';

@Resolver(() => Experiment)
export class ExperimentsResolver {
  constructor(
    private readonly experimentsService: ExperimentsService,
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
  ) {}

  @Mutation(() => MessageResponse)
  createExperiment(
    @Args('experiment') createExperimentInput: CreateExperimentInput,
    @CurrentUser() user: User,
  ) {
    if (!user.app_metadata.isApproved)
      throw new UnauthorizedException(
        'You have to be an approved user to create an experiment',
      );
    return this.experimentsService
      .create({ ...createExperimentInput, createdBy: user.email })
      .then(() => ({
        message: 'Created experiment successfully!',
      }));
  }

  @Public()
  @Query(() => [Experiment], { name: 'experiments' })
  findAll(
    @Args('community', { nullable: true })
    community?: string,
    @Args('createdBy', { nullable: true })
    createdBy?: string,
  ) {
    return this.experimentsService.query({ communities: community, createdBy });
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

  @Mutation(() => MessageResponse)
  removeExperiment(@Args('_id') _id: string, @CurrentUser() user: User) {
    return this.experimentsService.remove(_id, user.email);
  }

  @Mutation(() => MessageResponse)
  tipExperiment(
    @Args('tip', { type: () => Int }) tip: number,
    @Args('id') id: string,
    @CurrentUser() user: User,
  ) {
    if (!user.app_metadata.isApproved)
      throw new UnauthorizedException(
        'You have to be an approved user to create an experiment',
      );
    return this.experimentsService.tipExperiment(id, user, tip);
  }
}
