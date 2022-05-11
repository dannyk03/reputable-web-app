import { AddIcon } from "@chakra-ui/icons";
import { Flex, Box, VStack, HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PrimaryButton } from "../../components/Button";
import { ExperimentCard } from "../../components/Experiments";
import type { ICommunity, PopulatedExperiment } from "@reputable/types";
import CommunityCard from "../../components/Communities/CommunityCard";
import { useRouter } from "next/router";
import SearchInput from "../../components/SearchInput";

export interface ExperimentsListViewProps {
  experiments: PopulatedExperiment[];
  community: ICommunity;
}

export default function ExperimentsListView({
  experiments,
  community,
}: React.PropsWithChildren<ExperimentsListViewProps>) {
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState("");
  const [items, setItems] = React.useState(experiments || []);

  useEffect(() => {
    const filtered = experiments.filter((exp: PopulatedExperiment) =>
      exp.title.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    setItems(filtered);
  }, [searchInput, experiments]);

  return (
    <Flex direction="row">
      <VStack w="260px" gap={5}>
        <CommunityCard community={community} />
        <PrimaryButton
          onClick={() => router.push("/experiments/create")}
          text="Create new experiment"
          leftIcon={<AddIcon width="12px" height="12px" />}
        />
      </VStack>
      <Box ml={10} width="100%">
        <HStack>
          <SearchInput
            value={searchInput}
            placeholder="Search for an experiment"
            onChange={(v) => {
              setSearchInput(v);
            }}
          />
        </HStack>
        <Box mt={6}>
          {items.map((experiment, idx) => (
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
