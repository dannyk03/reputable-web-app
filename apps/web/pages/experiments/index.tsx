import { useRouter } from "next/router";
import React from "react";
import ExperimentsListView from "../../containers/Experiments/List";
import { communities } from "../../mockData";
import { useExperiments } from "../../_api/Experiments/all";

export default function Experiments() {
  const router = useRouter();
  const { data, isLoading, error, isFetching } = useExperiments({
    community: "sleep",
  });
  if (!router.query.community || isLoading) {
    return <></>;
  }
  return <ExperimentsListView experiments={data} community={communities[0]} />;
}
