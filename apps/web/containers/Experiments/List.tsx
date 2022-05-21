import { AddIcon } from "@chakra-ui/icons";
import { Flex, Box, VStack, HStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { PrimaryButton } from "../../components/Button";
import { ExperimentCard } from "../../components/Experiments";
import type { ICommunity, PopulatedExperiment } from "@reputable/types";
import CommunityCard from "../../components/Communities/CommunityCard";
import { useRouter } from "next/router";
import SearchInput from "../../components/SearchInput";
import { useApiContext } from "../../providers/ApiContext";
import Modal from "../../components/Modal";
import Fuse from "fuse.js";
import { sortBy } from "lodash";

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

  const { user } = useApiContext();

  useEffect(() => {
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ["title"],
    };

    const fuse = new Fuse(experiments, options);
    if (searchInput.trim() !== "") {
      const result = fuse.search(searchInput);
      setItems(
        sortBy(result, ["score"])
          .reverse()
          .map((r) => r.item)
      );
    } else {
      setItems(experiments);
    }
  }, [searchInput, experiments]);

  return (
    <Flex direction="row">
      <VStack w="260px" gap={5}>
        <CommunityCard community={community} />
        {!user?.app_metadata?.isApproved ? (
          <Modal
            title="Information"
            button={
              <PrimaryButton
                text="Create new experiment"
                leftIcon={<AddIcon width="12px" height="12px" />}
              />
            }
          >
            You have to be approved by an administrator to be able to create an
            experiment
          </Modal>
        ) : (
          <PrimaryButton
            onClick={() => router.push(`/${community.slug}/create`)}
            text="Create new experiment"
            leftIcon={<AddIcon width="12px" height="12px" />}
          />
        )}
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
