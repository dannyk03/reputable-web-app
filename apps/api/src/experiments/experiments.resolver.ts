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
import {
  Experiment,
  MarkerValueChange,
  MarkerValueChangeType,
  ResultHistory,
} from './entities/experiment.entity';
import { CreateExperimentInput } from './dto/create-experiment.input';
import { UpdateExperimentInput } from './dto/update-experiment.input';
import { Public } from 'src/decorators';
import { XOR } from 'src/common/helpers';

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
          results: experiment.results.map((result, j) => {
            const history = (result.history || []).sort(
              (a, b) => b.date.getTime() - a.date.getTime(),
            );
            if (history.length > 1) {
              const value = history[1].markerValue - history[0].markerValue;
              const lastChange: MarkerValueChange = {
                type: XOR(value > 0, result.marker.more_is_better)
                  ? MarkerValueChangeType.POSITIVE
                  : MarkerValueChangeType.NEGATIVE,
                value: value,
                percentage: (value / history[1].markerValue) * 100,
              };
            }
            return {
              ...result,
              history,
            };
          }),
        };
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
