import {
  InputType,
  Int,
  Field,
  GraphQLISODateTime,
  PartialType,
} from '@nestjs/graphql';
import {
  ExperimentDescription,
  ExperimentResultMarker,
} from '../entities/experiment.entity';

@InputType()
class ExperimentDescriptionInput {
  @Field({ nullable: true })
  idea?: string;

  @Field({ nullable: true })
  goal?: string;

  @Field({ nullable: true })
  summary?: string;

  @Field({ nullable: true })
  results?: string;

  @Field({ nullable: true })
  design?: string;
}

@InputType()
class ExperimentBountyInput {
  @Field()
  amount?: number;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
class ExperimentResultMarkerInput {
  @Field()
  name?: string;
  @Field(() => [String], { nullable: true, defaultValue: [] })
  devices?: string[];
  @Field({ nullable: true })
  slug?: string;
}

@InputType()
export class CreateExperimentInput {
  @Field()
  title: string;

  @Field(() => ExperimentDescriptionInput)
  description: ExperimentDescriptionInput;

  @Field(() => ExperimentBountyInput)
  bounty: ExperimentBountyInput;

  @Field(() => [ExperimentResultMarkerInput])
  markers: ExperimentResultMarkerInput[];

  @Field()
  experimentPeriod: number;

  @Field(() => [String])
  communities: string[];
}
