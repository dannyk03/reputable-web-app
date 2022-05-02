import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommunityInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
