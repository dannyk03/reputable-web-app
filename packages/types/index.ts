export interface BaseMongoEntity {
  createdAt?: Date;
  _id: string;
  updatedAt?: Date;
}

export interface IUserMetadata {
  tokens?: number;
  transactions?: ITransaction[];
  communities?: string[];
  tips?: ITip[];
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
  order?: number;
  bgColor: string;
  textColor: string;
  isEnabled?: boolean;
  isPublished?: boolean;
}

export enum ExperimentStatus {
  ACTIVE = "ACTIVE",
  RESULTS_PENDING = "RESULTS_PENDING",
  IN_DESIGN = "IN_DESIGN",
  CLOSED = "CLOSED",
}

/*
export enum MarkerValueChangeType {
  POSITIVE = "POSITIVE",
  NEGATIVE = "NEGATIVE",
}
*/

export interface IAppMetadata {
  isApproved?: boolean;
  role?: "admin";
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
  app_metadata?: IAppMetadata;
  experiments_count?: number;
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
  slug?: string;
  devices?: string[];
  /*
  more_is_better?: boolean;
  unit?: string;
  */
}

/*
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
*/

export interface IExperimentDescription {
  goal?: string;
  idea?: string;
  design?: string;
  results?: string;
  summary?: string;
}

export interface IExperimentBounty {
  amount: number;
  description?: string[];
}
export interface IExperiment extends BaseMongoEntity {
  title: string;
  status: ExperimentStatus;
  createdBy: string;
  communities: string[];
  description?: IExperimentDescription;
  /*
  results: IExperimentResult[];
  startDate: Date;
  endDate: Date;
  */
  markers: IExperimentResultMarker[];
  experimentPeriod: number;
  comments?: IComment[];
  tips?: ITip[];
  bounty?: IExperimentBounty;
  // prettifyResult?: (result: IExperimentResult) => IExperimentResult;
}

export interface PopulatedExperiment
  extends Omit<IExperiment, "createdBy" | "communities" | "comments"> {
  createdBy?: IUser;
  communities?: ICommunity[];
  comments?: PopulatedComment[];
}
export interface PopulatedComment extends Omit<IComment, "author" | "replies"> {
  author: IUser;
  replies?: { author?: IUser } & Omit<IComment, "author">[];
}

export interface IMessageResponse {
  message: string;
}

export type ITipDTO = Pick<ITip, "amount">;

export enum UserRoleEnum {
  ADMIN = "admin",
}
