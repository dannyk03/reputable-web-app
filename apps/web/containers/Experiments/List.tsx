import { AddIcon } from '@chakra-ui/icons';
import { Flex, Box, VStack, HStack, Hide } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { PrimaryButton } from '../../components/Button';
import { ExperimentCard } from '../../components/Experiments';
import type { ICommunity, PopulatedExperiment } from '@reputable/types';
import CommunityCard from '../../components/Communities/CommunityCard';
import { useRouter } from 'next/router';
import SearchInput from '../../components/SearchInput';
import { useApiContext } from '../../providers/ApiContext';
import Modal from '../../components/Modal';
import Fuse from 'fuse.js';
import { sortBy } from 'lodash';
import { useMediaQuery } from '@chakra-ui/react';

export interface ExperimentsListViewProps {
  experiments: PopulatedExperiment[];
  community: ICommunity;
}

export default function ExperimentsListView({
  experiments,
  community,
}: React.PropsWithChildren<ExperimentsListViewProps>) {
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState('');
  const [items, setItems] = React.useState(experiments || []);
  const [isMobile] = useMediaQuery('(max-width: 40em');

  const { user, authorized, isAdmin } = useApiContext();

  useEffect(() => {
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ['title'],
    };

    const fuse = new Fuse(experiments, options);
    if (searchInput.trim() !== '') {
      const result = fuse.search(searchInput);
      setItems(
        sortBy(result, ['score'])
          .reverse()
          .map((r) => r.item),
      );
    } else {
      setItems(experiments);
    }
  }, [searchInput, experiments]);

  let createNewExperiementModalTitle = 'Information';
  if (!user) createNewExperiementModalTitle = 'Oops';

  let createNewExperiementModalBody =
    'You have to be approved by an administrator to be able to create an experiment';
  if (!user)
    createNewExperiementModalBody = 'Please sign up to create an experiment';
  let createNewExperiementModalButtonName = 'Ok';

  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      justify={isMobile ? 'center' : 'space-between'}
      w="100%"
    >
      {/* <Hide below="md"> */}

      <VStack w={isMobile ? '100%' : '260px'} gap={5}>
        <Hide above="md">
          <HStack w={'100%'}>
            <SearchInput
              value={searchInput}
              placeholder="Search for an experiment"
              onChange={(v) => {
                setSearchInput(v);
              }}
            />
          </HStack>
        </Hide>
        <CommunityCard community={community} />

        {isAdmin ? (
          <PrimaryButton
            onClick={() => router.push(`/${community.slug}/create`)}
            text="Create new experiment"
            leftIcon={<AddIcon width="12px" height="12px" />}
          />
        ) : (
          <Modal
            title={createNewExperiementModalTitle}
            closeButtonTitle={createNewExperiementModalButtonName}
            button={
              <PrimaryButton
                text="Create new experiment"
                leftIcon={<AddIcon width="12px" height="12px" />}
              />
            }
          >
            {createNewExperiementModalBody}
          </Modal>
        )}
      </VStack>
      {/* </Hide> */}
      <Box ml={isMobile ? 0 : 10} width="100%">
        <Hide below="md">
          <HStack>
            <SearchInput
              value={searchInput}
              placeholder="Search for an experiment"
              onChange={(v) => {
                setSearchInput(v);
              }}
            />
          </HStack>
        </Hide>

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
