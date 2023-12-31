import { Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import type { ICommunity } from "@reputable/types";
import Image from "next/image";
import Card from "../Card";
import { useJoinCommunity } from "../../_api/Users/mutations";
import { useApiContext } from "../../providers/ApiContext";

export interface CommunityCardProps {
  community: ICommunity;
}

export default function CommunityCard({
  community,
}: React.PropsWithChildren<CommunityCardProps>) {
  const { user } = useApiContext();
  const { mutate, isLoading } = useJoinCommunity(community.slug);

  if (!community) return <></>;

  const joinedCommunities = user?.user_metadata?.communities || [];
  const alreadyJoined = joinedCommunities.includes(community.slug);

  return (
    <Card noShadow w="100%">
      <Flex justify="center" align="center">
        <VStack gap={3}>
          <Box maxW="82px" maxH="82px">
            {community.icon && (
              <Image
                src={community.icon}
                alt={community.name}
                width={100}
                height={100}
              />
            )}
          </Box>
          <Text
            color="gray.800"
            fontSize="24px"
            lineHeight="32px"
            fontWeight={600}
          >
            {community.name}
          </Text>
        </VStack>
      </Flex>
    </Card>
  );
}
