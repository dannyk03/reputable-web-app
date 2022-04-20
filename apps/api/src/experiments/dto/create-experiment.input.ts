import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateExperimentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
