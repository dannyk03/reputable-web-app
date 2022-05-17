import { Divider, Heading } from "@chakra-ui/react";
import type { IExperimentResultMarker } from "@reputable/types";
import React from "react";
import Card from "../../Card";
import CollapsableMarkerTag from "./components/CollapsableMarkerTag";

export interface ExperimentMarkerInfoProps {
  markers: IExperimentResultMarker[];
}

export default function ExperimentMarkerInfo({
  markers,
}: React.PropsWithChildren<ExperimentMarkerInfoProps>) {
  return (
    <Card noShadow w="100%">
      <Heading fontSize="20px" fontWeight={600} color="primary.800">
        Health markers to track
      </Heading>
      <Divider my="4" />
      <ul>
        {markers.map((marker) => (
          <CollapsableMarkerTag marker={marker} mb={3} />
        ))}
      </ul>
    </Card>
  );
}
