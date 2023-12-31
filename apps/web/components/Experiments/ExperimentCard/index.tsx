import {
  Avatar,
  ChakraProps,
  HStack,
  Icon,
  VStack,
  LinkBox,
  Spacer,
  LinkOverlay,
  Link,
  Text,
  IconButton,
  Show,
  Tooltip,
  Hide,
} from '@chakra-ui/react';
import React from 'react';
import makeAvatar from '../../../helpers/makeAvatar';
import NextLink from 'next/link';
import Tag from '../../Tag';
import Card from '../../Card';
import type { PopulatedExperiment, ICommunity } from '@reputable/types';
import ReputableLogo from '../../Icons/ReputableLogo';
import Image from 'next/image';
import calculateContributions from '../../../helpers/calculateContributions';
import { useRouter } from 'next/router';
import { useExperiment } from '../../../_api/Experiments/mutations';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useApiContext } from '../../../providers/ApiContext';
import moment from 'moment';
import ExperimentCardContent from './components/ExperimentCardContent';
import { useQueryClient } from 'react-query';

export interface ExperimentCardProps extends ChakraProps {
  experiment: Pick<
    PopulatedExperiment,
    | 'tips'
    | 'createdBy'
    | 'title'
    | '_id'
    | 'description'
    | 'communities'
    | 'updatedAt'
    | 'createdAt'
  >;
}

export default function ExperimentCard({
  experiment,
  ...restProps
}: React.PropsWithChildren<ExperimentCardProps>) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useApiContext();
  const { totalTokens } = calculateContributions(experiment.tips);
  const timeAgo = moment(
    new Date(experiment.updatedAt || experiment.createdAt),
  ).fromNow();
  const k = router.query.community
    ? ['experiments', { community: router.query.community }]
    : ['experiments', { createdBy: router.query.email }];
  const { remove } = useExperiment({
    configs: {
      remove: {
        // When mutate is called:
        onMutate: async (newTodo) => {
          // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
          await queryClient.cancelQueries('experiments');

          // Snapshot the previous value
          const previousExperiments = queryClient.getQueryData(k);

          // Optimistically update to the new value
          queryClient.setQueryData(k, (old) => [
            ...(old as PopulatedExperiment[]),
            newTodo,
          ]);

          // Return a context object with the snapshotted value
          return { previousExperiments };
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (
          err,
          newTodo,
          context: { previousExperiments: PopulatedExperiment[] },
        ) => {
          queryClient.setQueryData(k, context.previousExperiments);
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries(k);
        },
      },
    },
  });
  const canEdit =
    user?.email === experiment.createdBy.email ||
    user?.app_metadata?.role === 'admin';

  if (!experiment.createdBy) return <></>;
  return (
    <Card {...restProps} noShadow>
      <HStack w="100%" align={'start'}>
        <LinkBox flexGrow={1}>
          <HStack>
            <Avatar
              width={'32px'}
              height={'32px'}
              name="Profile Photo"
              src={experiment.createdBy.picture ?? makeAvatar('Some name')}
            />
            <Hide below="md">
              <Text
                color="gray.700"
                fontWeight={600}
                lineHeight="28px"
                fontSize={18}
              >
                {experiment.createdBy.name}
              </Text>
              <Text
                color="gray.600"
                fontWeight={400}
                lineHeight="24px"
                fontSize="16px"
              >
                {timeAgo}
              </Text>
            </Hide>
            {/* Mobile View START */}
            <Show below="md">
              <VStack alignItems="start" justify={'center'}>
                <Text
                  color="gray.700"
                  fontWeight={600}
                  lineHeight="28px"
                  fontSize={18}
                >
                  {experiment.createdBy.name}
                </Text>
                <Text
                  style={{ marginTop: '-5px' }}
                  color="gray.600"
                  fontWeight={400}
                  fontSize="16px"
                >
                  {timeAgo}
                </Text>
              </VStack>
            </Show>
            {/* Mobile View END */}
            <Spacer />
            <HStack alignItems="center">
              <Icon as={ReputableLogo} width="20px" height="20px" />
              <Text
                fontWeight={{ small: 600, medium: 400 }}
                size="16px"
                lineHeight="24px"
              >
                {totalTokens}
              </Text>
            </HStack>
          </HStack>
          <NextLink
            href={`/${experiment.communities[0].slug}/${experiment._id}`}
            passHref
          >
            <LinkOverlay>
              <Text
                fontSize={['20px', '24px']}
                lineHeight={['28px', '32px']}
                fontWeight={600}
                color="gray.800"
                mt={2}
              >
                {experiment.title}
              </Text>
              <ExperimentCardContent content={experiment.description?.goal} />
            </LinkOverlay>
          </NextLink>
          <HStack mt={3}>
            {experiment.communities.map((comm: ICommunity, idx: number) => (
              <Tag
                backgroundColor={comm.bgColor}
                color={comm.textColor}
                key={`${experiment._id}_tag_${idx}`}
              >
                <HStack>
                  <Image
                    alt="Sleep Community"
                    src={comm.icon}
                    width="14px"
                    height="14px"
                  />
                  <Text>{comm.name}</Text>
                </HStack>
              </Tag>
            ))}
          </HStack>
        </LinkBox>
        {canEdit && (
          <HStack>
            <Tooltip label="Update Experiment">
              <NextLink
                href={`/${experiment.communities[0].slug}/${experiment._id}/edit`}
                passHref
              >
                <Link>
                  <IconButton
                    ml={2}
                    aria-label="Update Experiment"
                    variant="outline"
                    size="sm"
                    colorScheme="yellow"
                    icon={<EditIcon />}
                  />
                </Link>
              </NextLink>
            </Tooltip>
            <Tooltip label="Delete Experiment">
              <IconButton
                ml={2}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure about deleting this experiment? This ',
                    )
                  )
                    remove.mutate({ _id: experiment._id });
                }}
                aria-label="Remove Experiment"
                variant="outline"
                size="sm"
                colorScheme="red"
                icon={<DeleteIcon />}
              />
            </Tooltip>
          </HStack>
        )}
      </HStack>
    </Card>
  );
}
