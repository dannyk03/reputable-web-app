// components/layout.js

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Icon,
  Text,
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";
import { BsThreeDots } from "react-icons/bs";
import Comments from "../../containers/Comments";
import React from "react";
import AboutExperiment from "../../components/Experiments/About";
import TextLink from "../../components/TextLink";
import ExperimentMarkerInfo from "../../components/Experiments/ExperimentMarkerInfo";
import { PrimaryButton } from "../../components/Button";
import ReputableLogo from "../../components/Icons/ReputableLogo";
import type { PopulatedExperiment } from "@reputable/types";
import ContributionsModal from "../../components/Experiments/ContributionsModal";
import TipModal from "../../components/TipModal";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import calculateContributions from "../../helpers/calculateContributions";
import { useApiContext } from "../../providers/ApiContext";
import Modal from "../../components/Modal";

interface ExperimentsSingleViewProps {
  experiment: PopulatedExperiment;
  isLoading?: boolean;
}

export default function ExperimentsSingleView({
  isLoading,
  experiment: data,
}: React.PropsWithChildren<ExperimentsSingleViewProps>) {
  const { isAuthenticated } = useAuth0();
  const { user } = useApiContext();
  const { totalTokens, matchedAmount, tokensTipped } = calculateContributions(
    data.tips
  );
  console.log(user);
  const tipFromCurrentUser = data.tips.filter(
    (t) => t.userId === user?.user_id
  );
  const alreadyTippedByUser = tipFromCurrentUser.length > 0;
  return (
    <HStack align={"start"} justify="start" gap="90px" w="100%">
      <Box flexGrow={1}>
        <TextLink
          _focus={{ outline: "none" }}
          label="Back to experiments"
          icon={<ArrowBackIcon />}
          href={{
            pathname: `/${data.communities[0].slug}`,
          }}
        />

        <Heading color="gray.800" fontSize="36px" pt={4} lineHeight="40px">
          {data.title}
        </Heading>
        <Flex pt={5}>
          <Flex gap={2} align="center" height={7}>
            {(data.communities || []).map((comm, idx) => (
              <HStack key={`communityTag_${idx}`}>
                <Image
                  alt={`${comm.name} Community`}
                  src={comm.icon}
                  width="24px"
                  height="24px"
                />
                <Text color="gray.700" fontSize="18px" fontWeight={400}>
                  {`${comm.name}`}
                </Text>
              </HStack>
            ))}
            <Text fontSize="18px">by</Text>
            <Text color="gray.700" fontSize="18px" fontWeight={600}>
              {data.createdBy.name}
            </Text>
          </Flex>
          <Spacer />
          <Flex gap={2}>
            {/*
          <Button leftIcon={<ArrowBackIcon />} variant="ghost" size="sm">
            Duplicate
          </Button>
          */}
            <FacebookShareButton url={window.location.href} title={data.title}>
              <FacebookIcon round size={20} />
            </FacebookShareButton>
            <TwitterShareButton url={window.location.href} title={data.title}>
              <TwitterIcon round size={20} />
            </TwitterShareButton>
            <LinkedinShareButton url={window.location.href} title={data.title}>
              <LinkedinIcon round size={20} />
            </LinkedinShareButton>
            <RedditShareButton url={window.location.href} title={data.title}>
              <RedditIcon round size={20} />
            </RedditShareButton>
            <IconButton
              aria-label="Show more options"
              height={7}
              icon={<BsThreeDots height={7} />}
              variant="ghost"
            />
          </Flex>
        </Flex>
        <Divider mt={2} />
        <Box mt={4}>
          {Object.entries(data.description).map(([k, v]) => {
            return (
              <Box py={3}>
                <Heading size="md">{k.toUpperCase()}</Heading>
                <Text mt={4}>{v}</Text>
              </Box>
            );
          })}
        </Box>
        <Box mt="50px">
          <Comments isLoading={isLoading} comments={data.comments} />
        </Box>
      </Box>

      <Flex minW="400px" direction="column" gap={6}>
        <VStack gap={4}>
          {!user?.app_metadata?.isApproved ? (
            <Modal
              title="Information"
              button={
                <PrimaryButton
                  w="100%"
                  disabled={!isAuthenticated || alreadyTippedByUser}
                  text={
                    isAuthenticated
                      ? alreadyTippedByUser
                        ? `Tipped ${tipFromCurrentUser[0].amount} REPT`
                        : "Tip REPT"
                      : "Sign in to tip this experiment"
                  }
                  leftIcon={
                    <Icon
                      as={ReputableLogo}
                      color="white"
                      width="16px"
                      height="16px"
                    />
                  }
                />
              }
            >
              You have to be approved by an administrator to be able to tip an
              experiment.
            </Modal>
          ) : (
            <TipModal experimentId={data._id}>
              <PrimaryButton
                w="100%"
                disabled={!isAuthenticated || alreadyTippedByUser}
                text={
                  isAuthenticated
                    ? alreadyTippedByUser
                      ? `Tipped ${tipFromCurrentUser[0].amount} REPT`
                      : "Tip REPT"
                    : "Sign in to tip this experiment"
                }
                leftIcon={
                  <Icon
                    as={ReputableLogo}
                    color="white"
                    width="16px"
                    height="16px"
                  />
                }
              />
            </TipModal>
          )}
          <HStack align="center">
            <Icon as={ReputableLogo} width="18px" height="18px" />
            <Text size="18px" fontWeight={600} lineHeight="28px">
              {Math.round(parseFloat(totalTokens))} REPT received
            </Text>
            <ContributionsModal tips={data.tips || []}>
              <Text
                color="primary.700"
                lineHeight="28px"
                fontWeight={600}
                size="18px"
                cursor="pointer"
              >
                See contributions
              </Text>
            </ContributionsModal>
          </HStack>
        </VStack>
        <Box>
          <AboutExperiment experimentId={data._id} experimentPeriod={28} />
        </Box>
        <Box>
          <ExperimentMarkerInfo markers={data.markers} />
        </Box>
      </Flex>
    </HStack>
  );
}
