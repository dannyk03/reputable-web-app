import {
  ObjectType,
  Field,
  Int,
  registerEnumType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { BaseMongoEntity } from 'src/common/entities/mongo';
import { buildSchema, DocumentType } from '@typegoose/typegoose';

export enum ExperimentStatus {
  ACTIVE = 'active',
  RESULTS_PENDING = 'results_pending',
  IN_DESIGN = 'in_design',
  CLOSED = 'closed',
}

registerEnumType(ExperimentStatus, {
  name: 'ExperimentStatus',
});

@ObjectType()
export class ExperimentResult {}

@ObjectType({ description: 'experiment' })
export class Experiment extends BaseMongoEntity {
  @Field()
  title?: string;
  @Field(() => ExperimentStatus)
  status: ExperimentStatus;
  @Field()
  createdBy: string;
  @Field(() => [String])
  tags: string[];
  @Field(() => [String])
  communities: string[];
  /*
  content: IContent[];
  comments: IComment[];
  */
  @Field()
  description?: string;
  /*
  results: ExperimentResult[];
  */
  @Field(() => GraphQLISODateTime)
  startDate: Date;
  @Field(() => GraphQLISODateTime)
  endDate: Date;
}

export type ExperimentDocument = DocumentType<Experiment>;

export const ExperimentSchema = buildSchema(Experiment);
