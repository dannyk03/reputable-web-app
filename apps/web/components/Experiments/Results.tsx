import {
  Box,
  Divider,
  Flex,
  Heading,
  Tab,
  TabList,
  Tabs,
  Text,
  Icon,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { BsDot } from "react-icons/bs";
import { ExperimentResult } from "../../types";
import MarkerCard from "./MarkerCard";

export interface ExperimentResultsProps {
  updatedAt: Date;
  results: ExperimentResult[];
}

export default function ExperimentResults({
  updatedAt = new Date(),
  results = [],
}: React.PropsWithChildren<ExperimentResultsProps>) {
  const timeAgo = moment(updatedAt).fromNow();
  return (
    <Box
      shadow="md"
      maxW="sm"
      borderWidth="1px"
      p={6}
      borderRadius="lg"
      overflow="hidden"
      minW="400px"
    >
      <Flex gap={4} direction="column">
        <Flex align="center">
          <Icon w={6} h={6} as={BsDot} color="green.400" />
          <Text fontWeight={400} color="gray.700">
            Last updated {timeAgo}
          </Text>
        </Flex>

        <Heading color="primary.800" fontWeight={600} fontSize={20}>
          Results
        </Heading>

        <Divider />

        <Tabs variant="soft-rounded" colorScheme="primary">
          <TabList>
            <Flex justify="start" width="100%">
              <Tab width="50%">This experimenter</Tab>
              <Tab width="50%">Collective</Tab>
            </Flex>
          </TabList>
        </Tabs>

        {results.map((result, index) => (
          <MarkerCard key={`markerCard_${index}`} {...result} />
        ))}
      </Flex>
    </Box>
  );
}
