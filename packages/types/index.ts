export interface BaseMongoEntity {
  createdAt?: Date;
  _id: string;
  updatedAt?: Date;
}

export interface IUserMetadata {
  tokens?: number;
  transactions?: ITransaction[];
  communities?: string[];
}

export interface ITip {
  userId: string;
  amount: number;
}

export interface ITransaction {
  amount: number;
  from: string;
  to: string;
}

export interface ICommunity extends BaseMongoEntity {
  name: string;
  icon: string;
  memberCount?: number;
  slug: string;
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
  tips?: ITip[];
  user_id: string;
  user_metadata?: IUserMetadata;
  experiments?: Pick<IExperiment, "createdBy">[];
  last_login: string;
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
  slug: string;
  devices?: string[];
  /*
  more_is_better?: boolean;
  unit?: string;
  */
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
  /*
  results: IExperimentResult[];
  startDate: Date;
  endDate: Date;
  */
  markers: IExperimentResultMarker[];
  experimentPeriod: number;
  comments?: IComment[];
  tips?: ITip[];
  prettifyResult?: (result: IExperimentResult) => IExperimentResult;
}

export interface PopulatedExperiment
  extends Omit<IExperiment, "createdBy" | "communities"> {
  createdBy?: IUser;
  communities?: ICommunity[];
}
export interface PopulatedComment extends Omit<IComment, "author" | "replies"> {
  author: IUser;
  replies?: { author?: IUser } & Omit<IComment, "author">[];
}

export interface IMessageResponse {
  message: string;
}

export type ITipDTO = Pick<ITip, "amount">;
