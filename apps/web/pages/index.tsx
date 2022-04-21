import CommunitiesListView from "../containers/Communities/List";
import { communities } from "../mockData";
import React from "react";

export default function HomePage() {
  return <CommunitiesListView data={communities} />;
}
