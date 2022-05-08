import { useRouter } from "next/router";
import React from "react";
import ExperimentsListView from "../../containers/Experiments/List";
import { useExperiments } from "../../_api/Experiments/queries/all";

export default function Experiments() {
  const router = useRouter();
  const { data, isLoading, error, isFetching } = useExperiments(
    router.query.community as string
  );
  if (!router.query?.community || isLoading) return <></>;
  const communityData = data[0].communities.filter(
    (c) => c.slug === router.query.community
  )[0];
  return <ExperimentsListView experiments={data} community={communityData} />;
}
