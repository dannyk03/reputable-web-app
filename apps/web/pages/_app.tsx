import { ChakraProvider } from "@chakra-ui/react";
import { IComment } from "../components/Comment";
import MainLayout from "../layouts/Main";
import reputableTheme from "../theme";

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
  title: string;
  status: ExperimentStatus;
  createdBy: IUser;
  tags: string[];
  communities: ICommunity[];
  content: IContent[];
  comments: IComment[];
  results: ExperimentResult[];
  startDate: Date;
  endDate: Date;
  updatedAt: Date;
  createdAt: Date;
}

function Reputable({ Component, pageProps }) {
  return (
    <ChakraProvider theme={reputableTheme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  );
}

export default Reputable;
