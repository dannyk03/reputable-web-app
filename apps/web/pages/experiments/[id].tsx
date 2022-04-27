import ExperimentSingleView from "../../containers/Experiments/Single";
import React from "react";
import { useRouter } from "next/router";
import { useExperiment } from "../../_api/Experiments/single";

export default function ExperimentSingle() {
  const router = useRouter();
  const { data, isLoading } = useExperiment(router.query.id as string);
  if (!router.query.id || isLoading) {
    return <></>;
  }
  return <ExperimentSingleView experiment={data} />;
}
