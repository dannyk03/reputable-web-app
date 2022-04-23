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
  plugin,
  post,
  prop,
} from '@typegoose/typegoose';
import { convertMinsToHrsMins, XOR } from '../../common/helpers';
// TS errors
const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

interface MarkerPrettifiers {
  [k: string]: (value: number) => string;
}

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
export class ResultHistory {
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
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
    toObject: {
      virtuals: true,
      getters: true,
    },
  },
})
@plugin(mongooseLeanGetters)
@plugin(mongooseLeanVirtuals)
@index({ communites: 1 })
export class Experiment extends BaseMongoEntity {
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
  @Field()
  @prop({
    required: true,
  })
  public createdBy: string;
  @Field(() => [String])
  @prop({ type: () => [String], required: true })
  public communities: string[];
  /*
  comments: IComment[];
  */
  @Field()
  @prop({ required: true })
  public description?: string;
  @Field(() => [ExperimentResult])
  @prop({ type: () => ExperimentResult })
  public results: ExperimentResult[];
  @Field(() => GraphQLISODateTime)
  @prop()
  public startDate: Date;
  @Field(() => GraphQLISODateTime)
  @prop()
  public endDate: Date;

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

export type ExperimentDocument = DocumentType<Experiment>;

export const ExperimentSchema = buildSchema(Experiment);
