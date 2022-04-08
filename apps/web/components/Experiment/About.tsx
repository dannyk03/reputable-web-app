import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Tag from "../Tag";

export interface AboutExperimentProps {
  startDate: Date;
  endDate: Date;
  tags: string[];
}

export default function AboutExperiment({
  startDate,
  endDate,
  tags = ["Sleep", "Meditation", "Stress"],
}: React.PropsWithChildren<AboutExperimentProps>) {
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);
  const currentMoment = moment(new Date());
  const totalDays = endMoment.diff(startMoment, "days") + 1;
  const daysPassed = Math.min(
    currentMoment.diff(startMoment, "days") + 1,
    totalDays
  );
  return (
    <Box
      shadow="md"
      borderWidth="1px"
      p={6}
      borderRadius="lg"
      overflow="hidden"
      width="100%"
    >
      <Heading size="sm">About the experiment</Heading>
      <Divider my="4" />
      <Heading fontSize="30px" fontWeight={600} color="primary.500">
        Day {daysPassed}/{totalDays}
      </Heading>
      <Box pt="5">
        <Flex>
          <Text fontWeight={700} color="gray.700">
            Start Date:
          </Text>{" "}
          <Text pl="1">{startMoment.format("LL")}</Text>
        </Flex>
        <Flex>
          <Text fontWeight={700} color="gray.700">
            End Date:
          </Text>{" "}
          <Text pl="1">{endMoment.format("LL")}</Text>
        </Flex>
        <Flex pt={5} gap={2}>
          {tags.map((tag) => (
            <Tag key={`tag_${tag}`}>{tag}</Tag>
          ))}
        </Flex>
      </Box>
    </Box>
  );
}
