import { Divider, Heading } from "@chakra-ui/react";
import React from "react";
import { ExperimentResultMarker } from "../../../types";
import Card from "../../Card";
import CollapsableMarkerTag from "./components/CollapsableMarkerTag";

export interface ExperimentMarkerInfoProps {
  markers: ExperimentResultMarker[];
}

export default function ExperimentMarkerInfo({
  markers,
}: React.PropsWithChildren<ExperimentMarkerInfoProps>) {
  return (
    <Card noShadow w="100%">
      <Heading size="sm">Health markers to track</Heading>
      <Divider my="4" />
      <ul>
        {markers.map((marker) => (
          <CollapsableMarkerTag marker={marker} mb={3} />
        ))}
      </ul>
    </Card>
  );
}
