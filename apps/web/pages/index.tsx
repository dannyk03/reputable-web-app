import CommunitiesListView from '../containers/Communities/List';
import React from 'react';
import { useCommunities } from '../_api/Communities/queries';

export default function HomePage() {
  const { data = [], isLoading, error, isFetching } = useCommunities();

  if (isLoading) {
    return <></>;
  }
  return <CommunitiesListView data={data} />;
}
