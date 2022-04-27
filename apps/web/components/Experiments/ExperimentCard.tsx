import {
  Avatar,
  Box,
  ChakraProps,
  HStack,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import makeAvatar from "../../helpers/makeAvatar";
import StatusTag from "./StatusTag";
import NextLink from "next/link";
import Tag from "../Tag";
import Card from "../Card";
import { PopulatedExperiment } from "types";
import { truncate } from "lodash";

export interface ExperimentCardProps extends ChakraProps {
  experiment: PopulatedExperiment;
}

export default function ExperimentCard({
  experiment,
  ...restProps
}: React.PropsWithChildren<ExperimentCardProps>) {
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
        <StatusTag status={experiment.status} />
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
        {experiment.communities.map((tag, idx) => (
          <Tag key={`${experiment._id}_tag_${idx}`}>{tag}</Tag>
        ))}
      </HStack>
    </Card>
  );
}
