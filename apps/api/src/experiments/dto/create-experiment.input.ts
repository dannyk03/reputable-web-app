import { InputType, Int, Field, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateExperimentInput {
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(() => GraphQLISODateTime)
  startDate: Date;
  @Field(() => GraphQLISODateTime)
  endDate: Date;
  @Field()
  createdBy: string;
}
