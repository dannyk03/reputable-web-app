import { useRouter } from "next/router";
import React from "react";
import ExperimentsListView from "../../containers/Experiments/List";
import { useCommunities } from "../../_api/Communities/queries";
import { useExperiments } from "../../_api/Experiments/queries/all";

export default function Experiments() {
  const router = useRouter();
  const { data, isLoading, error, isFetching } = useExperiments({
    community: router.query.community as string,
  });
  const { data: communities, isLoading: isLoadingCommunities } =
    useCommunities();
  if (!router.query?.community || isLoading || isLoadingCommunities)
    return <></>;
  const communityData = communities.filter(
    (c) => c.slug === router.query.community
  )[0];
  return <ExperimentsListView experiments={data} community={communityData} />;
}
