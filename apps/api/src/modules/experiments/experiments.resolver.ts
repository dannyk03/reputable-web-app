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

@Resolver(() => Experiment)
export class ExperimentsResolver {
  private commentsLoader: DataLoader<string, Comment>;
  constructor(
    private readonly experimentsService: ExperimentsService,
    private readonly commentsService: CommentsService,
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

  @Query(() => Experiment, { name: 'experiment' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.experimentsService.findOne(_id);
  }

  @ResolveField('comments', (returns) => [Comment])
  getComments(@Parent() experiment: Experiment) {
    return this.commentsLoader.load(experiment._id);
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
