import {
  ObjectType,
  Field,
  registerEnumType,
  GraphQLISODateTime,
  Float,
} from '@nestjs/graphql';
import { BaseMongoEntity } from '../../common/entities/mongo';
import {
  buildSchema,
  DocumentType,
  index,
  modelOptions,
} from '@typegoose/typegoose';

export enum ExperimentStatus {
  ACTIVE = 'active',
  RESULTS_PENDING = 'results_pending',
  IN_DESIGN = 'in_design',
  CLOSED = 'closed',
}

export enum MarkerValueChangeType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

registerEnumType(ExperimentStatus, {
  name: 'ExperimentStatus',
});

registerEnumType(MarkerValueChangeType, {
  name: 'MarkerValueChangeType',
});

@ObjectType()
export class ExperimentResultMarker {
  @Field()
  name: string;
  @Field()
  unit: string;
  @Field()
  slug: string;
  @Field(() => Boolean)
  more_is_better: boolean;
}

@ObjectType()
export class ResultHistory {
  @Field(() => GraphQLISODateTime)
  date: Date;
  @Field(() => Float)
  markerValue: number;
  @Field()
  imageLink: string;
}

@ObjectType()
export class MarkerValueChange {
  @Field(() => MarkerValueChangeType)
  type: MarkerValueChangeType;
  @Field(() => Float)
  percentage: number;
  @Field(() => Float)
  value: number;
}

@ObjectType()
export class ExperimentResult {
  @Field(() => ExperimentResultMarker)
  marker: ExperimentResultMarker;
  @Field(() => [ResultHistory])
  history: ResultHistory[];
  @Field(() => MarkerValueChange, { nullable: true })
  lastChange?: MarkerValueChange;
}

@ObjectType({ description: 'experiment' })
@modelOptions({ schemaOptions: { timestamps: true } })
@index({ communites: 1 })
export class Experiment extends BaseMongoEntity {
  @Field()
  title?: string;
  @Field(() => ExperimentStatus)
  status: ExperimentStatus;
  @Field()
  createdBy: string;
  @Field(() => [String])
  communities: string[];
  /*
  comments: IComment[];
  */
  @Field()
  description?: string;
  @Field(() => [ExperimentResult])
  results: ExperimentResult[];
  @Field(() => GraphQLISODateTime)
  startDate: Date;
  @Field(() => GraphQLISODateTime)
  endDate: Date;
}

export type ExperimentDocument = DocumentType<Experiment>;

export const ExperimentSchema = buildSchema(Experiment);
