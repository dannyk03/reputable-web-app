import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Card from "../Card";
import { MdInfo } from "react-icons/md";
import NextLink from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import TextLink from "../TextLink";

export interface CreateInfoCardProps {
  currentStep: number;
  totalSteps: number;
  step: {
    title: string;
    description: string;
  };
}

export default function CreateInfoCard({ currentStep, totalSteps, step = {} }) {
  /**
   * Current step value state will hold a value between 0-100
   * and it will be used to determine which step the is user at currently.
   */
  const stepValue = 100 / totalSteps;
  return (
    <Card maxW="340px">
      <Flex justify="start" direction="column" gap={4}>
        <HStack align="center" color="primary.800">
          <Icon as={MdInfo} w="20px" h="20px" />
          <Text fontSize="20px" lineHeight="28px" fontWeight={600}>
            Creating an experiment
          </Text>
        </HStack>
        <HStack gap={2}>
          <CircularProgress
            size="96px"
            value={currentStep * stepValue}
            color="green.400"
          >
            <CircularProgressLabel
              fontSize="14px"
              lineHeight="20px"
              color="gray.700"
              px={3}
            >
              Step {currentStep}/{totalSteps}
            </CircularProgressLabel>
          </CircularProgress>
          <Text>{step.title ?? ""}</Text>
        </HStack>
        <Text
          color="gray.700"
          fontSize="16px"
          lineHeight="24px"
          fontWeight={400}
        >
          {step.description ?? ""}
        </Text>
        <TextLink href="#" icon={<ArrowForwardIcon />} label="Learn more" />
      </Flex>
    </Card>
  );
}
