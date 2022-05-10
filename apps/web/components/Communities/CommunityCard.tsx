import { Box, Flex, VStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { ICommunity } from "../../types";
import Image from "next/image";
import Card from "../Card";
import { useJoinCommunity } from "../../_api/Users/mutations";
import { CheckIcon } from "@chakra-ui/icons";
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
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
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
          <Text
            lineHeight="28px"
            fontSize="18px"
            fontWeight={400}
          >{`${formatter.format(community.memberCount)} members`}</Text>
          {user && (
            <Button
              disabled={alreadyJoined || isLoading}
              variant="outline"
              onClick={() => mutate()}
              leftIcon={alreadyJoined && <CheckIcon />}
            >
              {alreadyJoined ? "Joined" : "Join"}
            </Button>
          )}
        </VStack>
      </Flex>
    </Card>
  );
}
