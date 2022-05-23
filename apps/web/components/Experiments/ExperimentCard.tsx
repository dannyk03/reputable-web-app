import {
  Avatar,
  Box,
  ChakraProps,
  HStack,
  Icon,
  LinkBox,
  Spacer,
  LinkOverlay,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import makeAvatar from "../../helpers/makeAvatar";
import NextLink from "next/link";
import Tag from "../Tag";
import Card from "../Card";
import type { PopulatedExperiment, ICommunity } from "@reputable/types";
import { truncate } from "lodash";
import ReputableLogo from "../Icons/ReputableLogo";
import Image from "next/image";
import calculateContributions from "../../helpers/calculateContributions";
import { useRouter } from "next/router";
import { useExperiment } from "../../_api/Experiments/mutations";
import { DeleteIcon } from "@chakra-ui/icons";
import { useApiContext } from "../../providers/ApiContext";
import moment from "moment";

export interface ExperimentCardProps extends ChakraProps {
  experiment: Pick<
    PopulatedExperiment,
    | "tips"
    | "createdBy"
    | "title"
    | "_id"
    | "description"
    | "communities"
    | "updatedAt"
    | "createdAt"
  >;
}

export default function ExperimentCard({
  experiment,
  ...restProps
}: React.PropsWithChildren<ExperimentCardProps>) {
  const router = useRouter();
  const { user } = useApiContext();
  const { totalTokens, matchedAmount, tokensTipped } = calculateContributions(
    experiment.tips
  );
  const timeAgo = moment(
    new Date(experiment.updatedAt || experiment.createdAt)
  ).fromNow();
  const { remove } = useExperiment({
    community: router.query.community as string,
    createdBy: experiment.createdBy.email,
  });
  return (
    <Card {...restProps} noShadow>
      <HStack w="100%" align={"start"}>
        <LinkBox flexGrow={1}>
          <HStack>
            <Avatar
              width={"32px"}
              height={"32px"}
              name="Profile Photo"
              src={experiment.createdBy.picture ?? makeAvatar("Some name")}
            />
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
            <Spacer />
            <HStack alignItems="center">
              <Icon as={ReputableLogo} width="20px" height="20px" />
              <Text size="16px" lineHeight="24px">
                {totalTokens}
              </Text>
            </HStack>
          </HStack>
          <NextLink
            href={`/${router.query.community}/${experiment._id}`}
            passHref
          >
            <LinkOverlay>
              <Text
                fontSize="24px"
                lineHeight="32px"
                fontWeight={600}
                color="gray.800"
                mt={2}
              >
                {experiment.title}
              </Text>
            </LinkOverlay>
          </NextLink>
          <Box
            color="gray.600"
            fontSize="18px"
            lineHeight="28px"
            fontWeight={400}
            mt={3}
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {truncate(experiment.description?.goal, {
              length: 300,
              separator: "\n",
            })}
          </Box>
          <HStack mt={3}>
            {experiment.communities.map((comm: ICommunity, idx: number) => (
              <Tag key={`${experiment._id}_tag_${idx}`}>
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
        {user?.email === experiment.createdBy.email && (
          <IconButton
            ml={2}
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure about deleting this experiment? This "
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
        )}
      </HStack>
    </Card>
  );
}
