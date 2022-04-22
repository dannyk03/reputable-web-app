import React from "react";
import { dehydrate, QueryClient } from "react-query";
import ExperimentsListView from "../../containers/Experiments/List";
import { communities, experiment } from "../../mockData";
import { useExperiments, prefetchExperiments } from "../../_api/Experiments";

export async function getStaticProps() {
  const queryClient = await prefetchExperiments({ community: "sleep" });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Experiments() {
  const { data, isLoading, error, isFetching } = useExperiments({
    community: "sleep",
  });
  console.log("data", data);
  return (
    <ExperimentsListView
      experiments={[experiment]}
      community={communities[0]}
    />
  );
}
