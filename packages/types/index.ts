export interface BaseMongoEntity {
  createdAt: Date;
  _id: string;
  updatedAt?: Date;
}

export enum ExperimentStatus {
  ACTIVE = "ACTIVE",
  RESULTS_PENDING = "RESULTS_PENDING",
  IN_DESIGN = "IN_DESIGN",
  CLOSED = "CLOSED",
}

export enum MarkerValueChangeType {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}

export interface IUser {
  created_at: Date;
  email: string;
  email_verified: boolean;
  picture: string;
  name: string;
}

export interface IComment extends BaseMongoEntity {
  author: string;
  replyTo?: string;
  text: string;
  experiment: string;
  replies?: IComment[];
}

export interface IExperimentResultMarker {
  name: string;
  unit: string;
  slug: string;
  more_is_better: boolean;
}

export interface IResultHistory {
  date: Date;
  markerValue: number;
  imageLink: string;
  prettified?: string;
}

export interface IMarkerValueChange {
  type: MarkerValueChangeType;
  percentage: number;
  value: number;
}

export interface IExperimentResult {
  marker: IExperimentResultMarker;
  history: IResultHistory[];
  lastChange?: IMarkerValueChange;
}

export interface IExperiment extends BaseMongoEntity {
  title: string;
  status: ExperimentStatus;
  createdBy: string;
  communities: string[];
  description: string;
  results: IExperimentResult[];
  startDate: Date;
  endDate: Date;
  comments?: IComment[];
  prettifyResult?: (result: IExperimentResult) => IExperimentResult;
}

export interface PopulatedExperiment extends Omit<IExperiment, "createdBy"> {
  createdBy: IUser;
}
export interface PopulatedComment extends Omit<IComment, "author"> {
  author: IUser;
}
