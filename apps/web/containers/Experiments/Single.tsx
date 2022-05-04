// components/layout.js

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Icon,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FcDonate, FcShare } from "react-icons/fc";
import Comments from "../../containers/Comments";
import React from "react";
import { PopulatedExperiment } from "types";
import { StatusTag } from "../../components/Experiments";
import AboutExperiment from "../../components/Experiments/About";
import TextLink from "../../components/TextLink";
import ExperimentMarkerInfo from "../../components/Experiments/ExperimentMarkerInfo";
import { PrimaryButton } from "../../components/Button";
import ReputableLogo from "../../components/Icons/ReputableLogo";
import { ITip } from "@reputable/types";
import ContributionsTooltip from "../../components/Experiments/ContributionsTooltip";
import { experiment } from "../../mockData";

interface ExperimentsSingleViewProps {
  experiment: PopulatedExperiment;
}

export default function ExperimentsSingleView({
  children,
  experiment: data,
}: React.PropsWithChildren<ExperimentsSingleViewProps>) {
  return (
    <Flex direction={"row"} gap="90px">
      <Box flexGrow={1}>
        <TextLink
          _focus={{ outline: "none" }}
          label="Back to experiments"
          icon={<ArrowBackIcon />}
          href="/experiments"
        />

        <Heading color="gray.800" fontSize="36px" pt={4} lineHeight="40px">
          {data.title}
        </Heading>
        <Flex pt={5}>
          <Flex gap={2} align="center" height={7}>
            <StatusTag status={data.status} />
            {/* 
            {(data.communities || []).map((comm, idx) => (
              <Box key={`communityTag_${idx}`}>
                <Image
                  alt="Sleep Community"
                  src={comm.icon}
                  width="28px"
                  height="28px"
                />
                <Text color="gray.700" fontSize="18px" fontWeight={400}>
                  {`${comm.name} by`}
                </Text>
              </Box>
            ))}
            */}
            <Text color="gray.700" fontSize="18px" fontWeight={600}>
              {data.createdBy.firstName}
            </Text>
          </Flex>
          <Spacer />
          <Flex gap={2}>
            {/*
          <Button leftIcon={<ArrowBackIcon />} variant="ghost" size="sm">
            Duplicate
          </Button>
          */}
            <Button
              leftIcon={<FcDonate />}
              height={7}
              variant="ghost"
              size="sm"
            >
              Tip
            </Button>
            <Button leftIcon={<FcShare />} height={7} variant="ghost" size="sm">
              Share
            </Button>
            <IconButton
              aria-label="Show more options"
              height={7}
              icon={<BsThreeDots height={7} />}
              variant="ghost"
            />
          </Flex>
        </Flex>
        <Box
          mt={10}
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></Box>
        <Box mt="50px">
          <Comments comments={data.comments} />
        </Box>
      </Box>

      <Flex minW="400px" direction="column" gap={6}>
        <VStack gap={4}>
          <PrimaryButton
            w="100%"
            text="Tip REPT"
            leftIcon={
              <Icon
                as={ReputableLogo}
                color="white"
                width="16px"
                height="16px"
              />
            }
          />
          <HStack align="center">
            <Icon as={ReputableLogo} width="18px" height="18px" />
            <Text size="18px" fontWeight={600} lineHeight="28px">
              {data.tips.reduce(
                (prev: number, curr: ITip) => (prev += curr.amount),
                0
              )}{" "}
              REPT received
            </Text>
            <ContributionsTooltip tips={experiment.tips || []}>
              <Text
                color="primary.700"
                lineHeight="28px"
                fontWeight={600}
                size="18px"
                cursor="pointer"
              >
                See contributions
              </Text>
            </ContributionsTooltip>
          </HStack>
        </VStack>
        <Box>
          <AboutExperiment experimentId={data._id} experimentPeriod={28} />
        </Box>
        <Box>
          <ExperimentMarkerInfo markers={data.markers} />
        </Box>
      </Flex>
    </Flex>
  );
}
