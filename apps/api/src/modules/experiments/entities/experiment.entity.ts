import {
  ObjectType,
  Field,
  registerEnumType,
  GraphQLISODateTime,
  Float,
} from '@nestjs/graphql';
import { BaseMongoEntity } from '../../../common/entities/mongo';
import {
  buildSchema,
  DocumentType,
  index,
  prop,
  Ref,
} from '@typegoose/typegoose';
import {
  ExperimentStatus,
  IExperiment,
  IExperimentResult,
  IExperimentResultMarker,
  IMarkerValueChange,
  IResultHistory,
  MarkerValueChangeType,
} from '@reputable/types';
import { convertMinsToHrsMins, XOR } from '../../../common/helpers';
import { Comment } from '../../comments/entities/comment.entity';
import { TransformQueries } from '../../../decorators';
import { User } from '../../../modules/users/entities/user.entity';

interface MarkerPrettifiers {
  [k: string]: (value: number) => string;
}

registerEnumType(ExperimentStatus, {
  name: 'ExperimentStatus',
});

registerEnumType(MarkerValueChangeType, {
  name: 'MarkerValueChangeType',
});

@ObjectType()
export class ExperimentResultMarker implements IExperimentResultMarker {
  @Field()
  @prop()
  name: string;
  @Field()
  @prop()
  unit: string;
  @Field()
  @prop()
  slug: string;
  @Field(() => Boolean)
  @prop()
  more_is_better: boolean;
}

@ObjectType()
export class ResultHistory implements IResultHistory {
  @Field(() => GraphQLISODateTime)
  @prop()
  date: Date;
  @Field(() => Float)
  @prop()
  markerValue: number;
  @Field()
  @prop()
  imageLink: string;
  @Field({ nullable: true })
  prettified?: string;
}

@ObjectType()
export class MarkerValueChange implements IMarkerValueChange {
  @Field(() => MarkerValueChangeType)
  type: MarkerValueChangeType;
  @Field(() => Float)
  percentage: number;
  @Field(() => Float)
  value: number;
}

@ObjectType()
export class ExperimentResult implements IExperimentResult {
  @Field(() => ExperimentResultMarker)
  @prop({ type: () => ExperimentResultMarker, _id: false })
  marker: ExperimentResultMarker;
  @Field(() => [ResultHistory])
  @prop({
    type: () => ResultHistory,
    get: (val: ResultHistory[]) =>
      (val || []).sort((a, b) => b.date.getTime() - a.date.getTime()),
    set: (val: ResultHistory[]) => val,
    default: [],
  })
  history: ResultHistory[];
  @Field(() => MarkerValueChange, { nullable: true })
  lastChange?: MarkerValueChange;
}

@ObjectType({ description: 'experiment' })
@TransformQueries(Experiment)
@index({ communites: 1 })
export class Experiment extends BaseMongoEntity implements IExperiment {
  /** Define possible markers here for now. */
  static markerPrettifiers: MarkerPrettifiers = {
    'resting-heart-rate': (value) => `${value.toFixed(1)} BPM`,
    sleep: (value) => `${convertMinsToHrsMins(value)}`,
    hrv: (value) => `${value} ms`,
  };
  @Field()
  @prop({ required: true })
  public title: string;
  @Field(() => ExperimentStatus)
  @prop({
    required: true,
    default: ExperimentStatus.IN_DESIGN,
    enum: ExperimentStatus,
  })
  public status: ExperimentStatus;
  @Field(() => User)
  @prop({
    required: true,
  })
  public createdBy: string;
  @Field(() => [String])
  @prop({ type: () => [String], required: true })
  public communities: string[];
  @Field()
  @prop({ required: true })
  public description: string;
  @Field(() => [ExperimentResult])
  @prop({ type: () => ExperimentResult })
  public results: ExperimentResult[];
  @Field(() => GraphQLISODateTime)
  @prop()
  public startDate: Date;
  @Field(() => GraphQLISODateTime)
  @prop()
  public endDate: Date;
  @Field(() => [Comment], { nullable: true })
  @prop({
    ref: () => 'Comment',
    foreignField: 'experiment',
    localField: '_id',
  })
  public comments?: Comment[];

  public prettifyResult? = (result: ExperimentResult) => {
    const history = (result.history || []).map((h) => ({
      ...h,
      prettified: Experiment.markerPrettifiers[result.marker.slug](
        h.markerValue,
      ),
    }));
    let lastChange: MarkerValueChange;
    if (history.length > 1) {
      const value = history[1].markerValue - history[0].markerValue;
      lastChange = {
        type: XOR(value > 0, result.marker.more_is_better)
          ? MarkerValueChangeType.POSITIVE
          : MarkerValueChangeType.NEGATIVE,
        value: value,
        percentage: (value / history[1].markerValue) * 100,
      };
    }
    return {
      ...result,
      history,
      lastChange,
    };
  };
}

export interface PopulatedExperiment extends Omit<Experiment, 'createdBy'> {
  createdBy: User;
}

export type ExperimentDocument = DocumentType<Experiment>;

export const ExperimentSchema = buildSchema(Experiment);
