// components/layout.js

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FcDonate, FcShare } from "react-icons/fc";
import Image from "next/image";
import Comments from "../../containers/Comments";
import React from "react";
import { PopulatedExperiment } from "types";
import { StatusTag } from "../../components/Experiments";
import AboutExperiment from "../../components/Experiments/About";
import ExperimentResults from "../../components/Experiments/Results";
import TextLink from "../../components/TextLink";

interface ExperimentsSingleViewProps {
  data: PopulatedExperiment;
}

export default function ExperimentsSingleView({
  children,
  data,
}: React.PropsWithChildren<ExperimentsSingleViewProps>) {
  return (
    <Flex direction={"row"} gap="90px">
      <Box flexGrow={1}>
        <TextLink icon={<ArrowBackIcon />} href="/experiments" />

        <Heading color="gray.800" fontSize="36px" pt={4} lineHeight="40px">
          {data.title}
        </Heading>
        <Flex pt={5}>
          <Flex gap={2} align="center" height={7}>
            <StatusTag status={data.status} />
            <Image
              alt="Sleep Community"
              src={data.communities[0].icon}
              width="28px"
              height="28px"
            />
            <Text color="gray.700" fontSize="18px" fontWeight={400}>
              {`${data.communities[0].name} by`}
            </Text>
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

      <Flex direction="column" gap={6}>
        <Box>
          <AboutExperiment
            startDate={data.startDate}
            endDate={data.endDate}
            tags={data.tags}
          />
        </Box>
        <Box>
          <ExperimentResults
            results={data.results}
            updatedAt={data.updatedAt}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
