import { CreateExperimentInput } from './create-experiment.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateExperimentInput extends PartialType(CreateExperimentInput) {
  @Field(() => Int)
  id: number;
}
