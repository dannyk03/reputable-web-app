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
import { Experiment, ResultHistory } from './entities/experiment.entity';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Public } from 'src/decorators';

@Resolver(() => Experiment)
export class ExperimentsResolver {
  constructor(private readonly experimentsService: ExperimentsService) {}

  @Mutation(() => Experiment)
  createExperiment(
    @Args('createExperimentInput') createExperimentInput: CreateExperimentInput,
  ) {
    return this.experimentsService.create(createExperimentInput);
  }

  @Public()
  @Query(() => [Experiment], { name: 'experiments' })
  findAll() {
    return this.experimentsService.findAll().then((experiments) => {
      return experiments.map((experiment, i) => {
        return {
          ...experiment,
          results: {}
        }
        /*
        experiment.results.map((result, j) => {
          if ((result.history || []).length > 1) {
            const valueDiff = result.history[]
            const lastChange = {
              type: result.marker.more_is_better ? 
            }
          }
        });*
        /
      });
    });
  }

  @Query(() => Experiment, { name: 'experiment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.experimentsService.findOne(id);
  }

  @Mutation(() => Experiment)
  updateExperiment(
    @Args('updateExperimentInput') updateExperimentInput: UpdateExperimentInput,
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
