import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Card from "../Card";
import Tag from "../Tag";

export interface AboutExperimentProps {
  experimentId: string;
  experimentPeriod: number;
}

export default function AboutExperiment({
  experimentId,
  experimentPeriod,
}: React.PropsWithChildren<AboutExperimentProps>) {
  return (
    <Card noShadow>
      <Heading fontSize="20px" fontWeight={600} color="primary.800">
        About the experiment
      </Heading>
      <Divider my="4" />
      <Box mt={3} display="inline">
        <Text size="18px" lineHeight="28px" color="gray.700">
          <b>Time period:</b> {experimentPeriod} days
        </Text>
      </Box>
      <Box mt={3}>
        <Text size="18px" lineHeight="28px" color="gray.700">
          <b>Experiment ID:</b> {experimentId}
        </Text>
      </Box>
    </Card>
  );
}
