export interface Author {
  firstName: string;
  lastName: string;
  profileImage?: string;
}

export interface IComment {
  author: Author; // Will be User.
  isReply?: boolean;
  upvotes: number;
  downvotes: number;
  updatedAt: Date;
  replies?: IComment[];
  id?: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export enum ExperimentStatus {
  ACTIVE = "active",
  RESULTS_PENDING = "results_pending",
  IN_DESIGN = "in_design",
  CLOSED = "closed",
}

export interface ICommunity {
  name: string;
  icon: string;
  memberCount: number;
  slug: string;
}

export interface IContent {
  heading: string;
  body: string;
}

export interface ExperimentResultMarker {
  name: string;
  unit: string;
}

export interface ResultHistory {
  date: Date;
  markerValue: MarkerValue;
  image?: File;
  imageLink?: string;
}

export interface MarkerValue {
  value: number;
  prettified?: string;
}

export enum MarkerValueChangeType {
  POSITIVE = "positive",
  NEGATIVE = "negative",
}

export interface MarkerValueChange {
  type: MarkerValueChangeType;
  percentage: number;
  value: number;
}

export interface ExperimentResult {
  marker: ExperimentResultMarker;
  history: ResultHistory[];
  lastChange?: MarkerValueChange;
}

export interface IExperiment {
  _id: string;
  title: string;
  status: ExperimentStatus;
  createdBy: IUser;
  tags: string[];
  communities: ICommunity[];
  content: IContent[];
  comments: IComment[];
  description: string;
  results: ExperimentResult[];
  startDate: Date;
  endDate: Date;
  updatedAt: Date;
  createdAt: Date;
}

export type ExperimentSearchResult = Pick<
  IExperiment,
  "title" | "communities" | "_id"
>;
