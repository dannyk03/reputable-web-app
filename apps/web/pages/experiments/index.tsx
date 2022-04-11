import React from "react";
import ExperimentsListView from "../../containers/Experiments/List";
import { communities, experiment } from "../../mockData";

export default function _() {
  return (
    <ExperimentsListView
      experiments={[experiment]}
      community={communities[0]}
    />
  );
}
