import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { ICommunity } from "../../types";
import Image from "next/image";
import Card from "../Card";

export interface CommunityCardProps {
  community: ICommunity;
}

export default function CommunityCard({
  community,
}: React.PropsWithChildren<CommunityCardProps>) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <Card noShadow w="100%">
      <Flex justify="center" align="center">
        <VStack gap={3}>
          <Box maxW="82px" maxH="82px">
            <Image
              src={community.icon}
              alt={community.name}
              width={100}
              height={100}
            />
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
        </VStack>
      </Flex>
    </Card>
  );
}
