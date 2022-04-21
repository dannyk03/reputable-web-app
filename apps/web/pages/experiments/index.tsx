import React from "react";
import { dehydrate, QueryClient } from "react-query";
import ExperimentsListView from "../../containers/Experiments/List";
import { communities, experiment } from "../../mockData";
import useExperiments from "../../_api/Experiments/getExperiments";

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("experiments", getPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Experiments() {
  const { experiments, isLoading, error } = useExperiments();
  return (
    <ExperimentsListView
      experiments={[experiment]}
      community={communities[0]}
    />
  );
}
