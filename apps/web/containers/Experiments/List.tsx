import { AddIcon } from "@chakra-ui/icons";
import { Flex, Box, VStack, HStack } from "@chakra-ui/react";
import { PopulatedExperiment } from "types";
import React from "react";
import { PrimaryButton } from "../../components/Button";
import { ExperimentCard } from "../../components/Experiments";
import SearchBar from "../../components/SearchBar";

export interface ExperimentsListViewProps {
  experiments: PopulatedExperiment[];
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
          <SearchBar />
        </HStack>
        <Box mt={6}>
          {experiments.map((experiment, idx) => (
            <ExperimentCard
              mt={6}
              key={`experiment_${idx}`}
              experiment={experiment}
            />
          ))}
        </Box>
      </Box>
    </Flex>
  );
}
