import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  VStack,
  Button,
  HStack,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { Experiment } from "api/src/modules/experiments/entities/experiment.entity";
import React from "react";
import { PrimaryButton } from "../../components/Button";
import CommunityCard from "../../components/Communities/CommunityCard";
import { ExperimentCard } from "../../components/Experiments";
import SearchBar from "../../components/SearchBar";

export interface ExperimentsListViewProps {
  experiments: Experiment[];
  community: string;
}

export default function ExperimentsListView({
  experiments,
  community,
}: React.PropsWithChildren<ExperimentsListViewProps>) {
  return (
    <Flex direction="row">
      <VStack w="260px" gap={5}>
        {/*<CommunityCard community={community} />*/}
        <PrimaryButton
          text="Create new experiment"
          leftIcon={<AddIcon width="12px" height="12px" />}
        />
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
