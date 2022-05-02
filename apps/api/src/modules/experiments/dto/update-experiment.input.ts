import { CreateExperimentInput } from './create-experiment.input';
import { InputType, PartialType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateExperimentInput extends PartialType(CreateExperimentInput) {
  @Field()
  title?: string;
}
