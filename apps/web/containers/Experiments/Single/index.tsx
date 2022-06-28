// components/layout.js

import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Icon,
  Text,
  Show,
  HStack,
  Divider,
  Hide,
  Link,
  Avatar,
  VStack,
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
import Comments from "../../Comments";
import React from "react";
import TextLink from "../../../components/TextLink";
import ReputableLogo from "../../../components/Icons/ReputableLogo";
import type { PopulatedExperiment } from "@reputable/types";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
import calculateContributions from "../../../helpers/calculateContributions";
import { useApiContext } from "../../../providers/ApiContext";
import NextLink from "next/link";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import makeAvatar from "../../../helpers/makeAvatar";
import moment from "moment";
import Tag from "../../../components/Tag";
import ExperimentSideInformation from "./ExperimentSideInformation";

const MDPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
}) as unknown as React.FC<any>;

interface ExperimentsSingleViewProps {
  experiment: PopulatedExperiment;
  isLoading?: boolean;
}

export default function ExperimentsSingleView({
  isLoading,
  experiment: data,
}: React.PropsWithChildren<ExperimentsSingleViewProps>) {
  const { user } = useApiContext();
  console.log("data", data);
  const timeAgo = moment(new Date(data.updatedAt ?? data.createdAt)).fromNow();
  const { totalTokens } = calculateContributions(data.tips);
  return (
    <Flex align={"start"} justify="start" w="100%">
      <Box flexGrow={[undefined, 1]} w="100%">
        <TextLink
          _focus={{ outline: "none" }}
          label="Back to experiments"
          color={["gray.500", "gray.700"]}
          icon={<ArrowBackIcon color={["gray.500", "gray.700"]} />}
          href={{
            pathname: `/${data.communities[0].slug}`,
          }}
        />
        <Show below="md">
          <HStack mt={8} w="100%">
            <VStack alignItems="start" w="100%">
              <HStack w="100%">
                <Avatar
                  width={"28px"}
                  height={"28px"}
                  name="Profile Photo"
                  src={data.createdBy.picture ?? makeAvatar(user.user_id)}
                />
                <NextLink
                  href={`/user/${encodeURIComponent(data.createdBy.email)}`}
                  passHref
                >
                  <Link>
                    <Text color="gray.700" fontSize="18px" fontWeight={600}>
                      {data.createdBy.name}
                    </Text>
                  </Link>
                </NextLink>
                <Spacer />
                <HStack alignItems="center">
                  <Icon
                    color="primary.500"
                    as={ReputableLogo}
                    width="20px"
                    height="20px"
                  />
                  <Text
                    color="primary.500"
                    fontWeight={[600, 400]}
                    size="16px"
                    lineHeight="24px"
                  >
                    {totalTokens}
                  </Text>
                </HStack>
              </HStack>
              <Text
                color="gray.600"
                fontWeight={400}
                lineHeight="24px"
                fontSize="16px"
              >
                {timeAgo}
              </Text>
            </VStack>
          </HStack>
        </Show>
        <Heading
          color="gray.800"
          fontSize={["20px", "36px"]}
          pt={[2, 4]}
          lineHeight={["28px", "40px"]}
        >
          {data.title}
        </Heading>
        <Flex pt={[2, 5]}>
          <Flex gap={2} align="center" height={7}>
            {(data.communities || []).map(
              (comm, idx) => (
                console.log(comm.icon),
                (
                  <Tag
                    backgroundColor={comm.bgColor}
                    color={comm.textColor}
                    key={`${comm._id}_tag_${idx}`}
                  >
                    <HStack>
                      <Image
                        style={{ display: "inline" }}
                        alt="Sleep Community"
                        src={comm.icon}
                        width="14px"
                        height="14px"
                      />
                      <Text>{comm.name}</Text>
                    </HStack>
                  </Tag>
                )
              )
            )}
            <Hide below="md">
              <Text fontSize="18px">by</Text>
              <NextLink
                href={`/user/${encodeURIComponent(data.createdBy.email)}`}
                passHref
              >
                <Link>
                  <Text color="gray.700" fontSize="18px" fontWeight={600}>
                    {data.createdBy.name}
                  </Text>
                </Link>
              </NextLink>
              <Avatar
                width={"32px"}
                height={"32px"}
                name="Profile Photo"
                src={data.createdBy.picture ?? makeAvatar("Some name")}
              />
            </Hide>
          </Flex>
          <Spacer />
          <Flex gap={2}>
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
            {/* 
            <IconButton
              aria-label="Show more options"
              height={7}
              icon={<BsThreeDots height={7} />}
              variant="ghost"
            />
            */}
          </Flex>
        </Flex>
        <Divider mt={2} />
        <Show below="md">
          <ExperimentSideInformation mt={5} w="100%" data={data} />
        </Show>
        <Box mt={4}>
          {Object.entries(data.description).map(([k, v]) => {
            if (v && v.trim() !== "") {
              console.log(v)
              return (
                <Box key={k} py={3}>
                  <Heading size="lg">{k.toUpperCase()}</Heading>
                  <MDPreview style={{ marginTop: "12px" }} source={v} />
                </Box>
              );
            }
          })}
        </Box>
        <Box mt="50px">
          <Comments isLoading={isLoading} comments={data.comments} />
        </Box>
      </Box>
      {/* Desktop View */}
      <Hide below="md">
        <ExperimentSideInformation minW="400px" data={data} />
      </Hide>
    </Flex>
  );
}
