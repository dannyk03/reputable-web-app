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
import { makeArray } from '../../common/helpers';

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
  async findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.experimentsService.findOne(_id);
  }

  @ResolveField('comments', (returns) => [Comment])
  async getComments(@Parent() experiment: Experiment) {
    return this.commentsService.loaderForExperiments.load(experiment._id);
  }

  @ResolveField('createdBy', (returns) => User, { nullable: true })
  async getUser(@Parent() experiment: Experiment) {
    // Auth0 treats same emails as different accounts if they are
    // registered using different identity providers e.g. GAuth and Username-Pass
    // see the link: https://community.auth0.com/t/duplicate-users-duplicate-emails-as-different-users/18300
    // https://auth0.com/docs/manage-users/user-accounts/user-account-linking/link-user-accounts
    const loadedUsers = await this.usersService.loaderForExperiments.load(
      experiment.createdBy,
    );
    const user = makeArray(loadedUsers)[0];

    return user ?? null;
  }

  @Public()
  @ResolveField('communities', (returns) => [Community])
  getCommunities(@Parent() experiment: Experiment) {
    return this.communitiesService.loaderForExperiments.loadMany(
      experiment.communities,
    );
  }

  @Mutation(() => MessageResponse)
  updateExperiment(
    @CurrentUser() user: User,
    @Args('_id') experimentId: string,
    @Args('experiment') updateExperimentInput: UpdateExperimentInput,
  ) {
    return this.experimentsService
      .update(experimentId, user, updateExperimentInput)
      .then(() => ({
        message: 'Updated experiment successfully!',
      }));
  }

  @Mutation(() => MessageResponse)
  removeExperiment(@Args('_id') _id: string, @CurrentUser() user: User) {
    return this.experimentsService.remove(_id, user);
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
