import { CreateExperimentInput } from './create-experiment.input';
import {
  InputType,
  PartialType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { Experiment } from '../entities/experiment.entity';

@InputType()
export class UpdateExperimentInput extends PartialType(
  IntersectionType(
    PickType(Experiment, ['results'] as const),
    CreateExperimentInput,
  ),
) {
  @Field()
  title?: string;
}
