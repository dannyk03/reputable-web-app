import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ExperimentResultMarker } from "../../types";
import Card from "../Card";
import Tag from "../Tag";

export interface ExperimentMarkerInfoProps {
  markers: ExperimentResultMarker[];
}

export default function ExperimentMarkerInfo({
  markers,
}: React.PropsWithChildren<ExperimentMarkerInfoProps>) {
  return (
    <Card noShadow>
      <Tag>
        <ul>
          <li>{markers[0].name}</li>
        </ul>
      </Tag>
    </Card>
  );
}
