import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  VStack,
  Button,
  HStack,
  Heading,
  Text,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import { truncate } from "lodash";
import React from "react";
import CommunityCard from "../../components/Communities/CommunityCard";
import ExperimentCard from "../../components/Experiments/ExperimentCard";
import StatusTag from "../../components/Experiments/Status";
import SearchBar from "../../components/SearchBar";
import Tag from "../../components/Tag";
import makeAvatar from "../../helpers/makeAvatar";
import { ICommunity, IExperiment } from "../../types";

export interface ExperimentsListViewProps {
  experiments: IExperiment[];
  community: ICommunity;
}

export default function ExperimentsListView({
  experiments,
  community,
}: React.PropsWithChildren<ExperimentsListViewProps>) {
  return (
    <Flex direction="row">
      <VStack w="260px" gap={5}>
        <CommunityCard community={community} />
        <Button
          leftIcon={<AddIcon width="12px" height="12px" />}
          colorScheme="primary"
          variant="solid"
          lineHeight="24px"
          fontSize="16px"
          fontWeight={600}
          width="100%"
          borderRadius="24px"
        >
          Create new experiment
        </Button>
      </VStack>
      <Box ml={10} width="100%">
        <HStack>
          <Heading
            fontSize="24px"
            lineHeight="32px"
            fontWeight={600}
            color="primary.800"
          >
            Experiments
          </Heading>
          <Spacer />
          <SearchBar />
        </HStack>
        <Box mt={6}>
          {experiments.map((experiment, idx) => (
            <ExperimentCard key={`experiment_${idx}`} experiment={experiment} />
          ))}
        </Box>
      </Box>
    </Flex>
  );
}
