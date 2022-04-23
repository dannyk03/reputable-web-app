import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExperimentsService } from './experiments.service';
import { Experiment } from './entities/experiment.entity';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Public } from 'src/decorators';

@Resolver(() => Experiment)
export class ExperimentsResolver {
  constructor(private readonly experimentsService: ExperimentsService) {}

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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.experimentsService.findOne(id);
  }

  @Mutation(() => Experiment)
  updateExperiment(
    @Args('experiment') updateExperimentInput: UpdateExperimentInput,
  ) {
    return this.experimentsService.update(
      updateExperimentInput.id,
      updateExperimentInput,
    );
  }

  @Mutation(() => Experiment)
  removeExperiment(@Args('id', { type: () => Int }) id: number) {
    return this.experimentsService.remove(id);
  }
}
