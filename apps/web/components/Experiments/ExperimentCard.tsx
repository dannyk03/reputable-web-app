import { Avatar, Box, HStack, Link, Spacer, Text } from "@chakra-ui/react";
import { truncate } from "lodash";
import React from "react";
import makeAvatar from "../../helpers/makeAvatar";
import { IExperiment } from "../../types";
import StatusTag from "./Status";
import NextLink from "next/link";
import Tag from "../Tag";

export interface ExperimentCardProps {
  experiment: IExperiment;
}

export default function ExperimentCard({
  experiment,
}: React.PropsWithChildren<ExperimentCardProps>) {
  return (
    <Box borderRadius="16px" p={6} border="1px solid" borderColor="gray.200">
      <HStack>
        <Avatar
          width={"32px"}
          height={"32px"}
          name="Profile Photo"
          src={experiment.createdBy.profileImage ?? makeAvatar("tolga")}
        />
        <Text
          color="gray.700"
          fontWeight={600}
          lineHeight="28px"
          fontSize={18}
        >{`${experiment.createdBy.firstName} ${experiment.createdBy.lastName}`}</Text>

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
        maxH="130px"
      >
        {experiment.content.map((content, index) => (
          <Text
            mt={index !== 0 && 3}
          >{`${content.heading}: ${content.body}`}</Text>
        ))}
      </Box>
      <HStack mt={3}>
        {experiment.tags.map((tag, idx) => (
          <Tag key={`${experiment._id}_tag_${idx}`}>{tag}</Tag>
        ))}
      </HStack>
    </Box>
  );
}
