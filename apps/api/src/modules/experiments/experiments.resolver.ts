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
import * as DataLoader from 'dataloader';
import { makeArray, mapFromArray } from '../../common/helpers';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { instanceToPlain } from 'class-transformer';
import { PopulatedComment } from '@reputable/types';
import { CommunitiesService } from '../communities/communities.service';
import { Community } from '../communities/entities/community.entity';
import { MessageResponse } from 'src/common/entities/response';

@Resolver(() => Experiment)
export class ExperimentsResolver {
  private commentsLoader: DataLoader<string, PopulatedComment[]>;
  private usersLoader: DataLoader<string, User>;
  private communitiesLoader: DataLoader<string, Community>;
  constructor(
    private readonly experimentsService: ExperimentsService,
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly communitiesService: CommunitiesService,
  ) {
    this.commentsLoader = new DataLoader<string, PopulatedComment[]>(
      async (_ids) => {
        const comments = await commentsService.query({
          // Since we convert everything with class-transformer, we need to
          // convert _ids back to ObjectId type.
          // Mongoose will not automatically inherit type for $in operator.
          experiment: { $in: _ids },
        });
        const commentsMap = mapFromArray<PopulatedComment>(
          comments,
          (c) => c.experiment as string,
        );
        return _ids.map((_id) => makeArray(commentsMap.get(_id)));
      },
    );
    this.usersLoader = new DataLoader<string, User>(async (emails) => {
      const users = await Promise.all(
        emails.map((email) => usersService.findOne(email)),
      );
      const usersMap = mapFromArray<User>(users, (u) => u.email);
      return emails.map((email) => usersMap.get(email) as User);
    });
    this.communitiesLoader = new DataLoader<string, Community>(
      async (slugs) => {
        const communities = await Promise.all(
          slugs.map((slug) => communitiesService.findOne(slug)),
        );
        const communitiesMap = mapFromArray<Community>(
          communities,
          (c) => c.slug,
        );
        return slugs.map((slug) => communitiesMap.get(slug) as Community);
      },
    );
  }

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
    return this.experimentsService.query({ community });
  }

  @Public()
  @Query(() => Experiment, { name: 'experiment' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.experimentsService.findOne(_id);
  }

  @ResolveField('comments', (returns) => [Comment])
  async getComments(@Parent() experiment: Experiment) {
    return this.commentsLoader.load(experiment._id).then((r) => {
      const returned = instanceToPlain(r, { exposeUnsetFields: false });
      return returned;
    });
  }

  @ResolveField('createdBy', (returns) => User)
  getUser(@Parent() experiment: Experiment) {
    return this.usersLoader.load(experiment.createdBy);
  }

  @Public()
  @ResolveField('communities', (returns) => [Community])
  getCommunities(@Parent() experiment: Experiment) {
    return this.communitiesLoader.loadMany(experiment.communities);
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
