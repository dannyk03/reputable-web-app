// components/layout.js

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { FcDonate, FcShare } from "react-icons/fc";
import Image from "next/image";
import StatusTag from "../../components/Experiment/Status";
import AboutExperiment from "../../components/Experiment/About";
import Comments from "../../containers/Comments";
import ExperimentResults from "../../components/Experiment/Results";
import React from "react";
import { IExperiment } from "../../pages/_app";

interface ExperimentsSingleViewProps {
  data: IExperiment;
}

export default function ExperimentsSingleView({
  children,
  data,
}: React.PropsWithChildren<ExperimentsSingleViewProps>) {
  return (
    <Flex direction={"row"} gap="90px">
      <Box flexGrow={1}>
        <Link href="/experiments">
          <Flex align="center">
            <ArrowBackIcon />
            <Text fontWeight={600} color="gray.700" pl={2}>
              Back
            </Text>
          </Flex>
        </Link>
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
            {data.tags.map((tag, idx) => (
              <Text
                key={`experiment_community_tag_${idx}`}
                py={1}
                px={3}
                border="1px solid"
                boxSizing="border-box"
                backgroundColor="gray.100"
                borderColor="gray.50"
                borderRadius="100px"
                fontSize="14px"
              >
                {tag}
              </Text>
            ))}
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
        <Box mt={10}>
          {data.content.map((content, index) => (
            <Box key={`content_${index}`} mt={index !== 0 && 8}>
              <Heading
                color="gray.800"
                as="h3"
                fontSize="20px"
                fontWeight={600}
                lineHeight="28px"
              >
                {content.heading}
              </Heading>
              <Text pt={4}>{content.body}</Text>
            </Box>
          ))}
        </Box>
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
