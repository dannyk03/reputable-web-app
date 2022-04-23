import { CreateExperimentInput } from './create-experiment.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { ResultHistory } from '../entities/experiment.entity';

@InputType()
export class UpdateExperimentInput extends PartialType(CreateExperimentInput) {
  @Field(() => [ResultHistory])
  results: ResultHistory[];
}
