import {
  Avatar,
  Box,
  ChakraProps,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import makeAvatar from "../../helpers/makeAvatar";
import NextLink from "next/link";
import Tag from "../Tag";
import Card from "../Card";
import { PopulatedExperiment } from "@reputable/types";
import { truncate } from "lodash";
import { ICommunity } from "@reputable/types";
import ReputableLogo from "../Icons/ReputableLogo";
import Image from "next/image";

export interface ExperimentCardProps extends ChakraProps {
  experiment: PopulatedExperiment;
}

export default function ExperimentCard({
  experiment,
  ...restProps
}: React.PropsWithChildren<ExperimentCardProps>) {
  const contributions: {
    tokensMatched: number;
    tokensTipped: number;
  } = (experiment?.tips || []).reduce(
    (prev, curr) => ({
      tokensMatched: (prev.tokensMatched += curr.amount * curr.amount),
      tokensTipped: (prev.tokensTipped += curr.amount),
    }),
    {
      tokensMatched: 0,
      tokensTipped: 0,
    }
  );
  const totalTokens = contributions.tokensMatched + contributions.tokensTipped;
  return (
    <Card {...restProps} noShadow>
      <HStack>
        <Avatar
          width={"32px"}
          height={"32px"}
          name="Profile Photo"
          src={experiment.createdBy.picture ?? makeAvatar("Some name")}
        />
        <Text color="gray.700" fontWeight={600} lineHeight="28px" fontSize={18}>
          {experiment.createdBy.name}
        </Text>

        <Text
          color="gray.600"
          fontWeight={400}
          lineHeight="24px"
          fontSize="16px"
        >
          2 days ago
        </Text>
        <Spacer />
        <HStack alignItems="center">
          <Icon as={ReputableLogo} width="20px" height="20px" />
          <Text size="16px" lineHeight="24px">
            {totalTokens}
          </Text>
        </HStack>
      </HStack>
      <NextLink href={`/experiments/${experiment._id}`} passHref>
        <Link>
          <Text
            fontSize="24px"
            lineHeight="32px"
            fontWeight={600}
            color="gray.800"
            mt={2}
          >
            {experiment.title}
          </Text>
        </Link>
      </NextLink>
      <Box
        color="gray.600"
        fontSize="18px"
        lineHeight="28px"
        fontWeight={400}
        mt={3}
        textOverflow="ellipsis"
        overflow="hidden"
        dangerouslySetInnerHTML={{
          __html: truncate(experiment.description, {
            length: 400,
            separator: "<br/>",
          }),
        }}
      />
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
    </Card>
  );
}
