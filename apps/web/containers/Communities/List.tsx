import {
  Flex,
  Grid,
  GridItem,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Autocomplete from "../../components/Autocomplete";
import { ICommunity } from "../../types";

interface CommunitiesListViewProps {
  data: ICommunity[];
}

export default function CommunitiesListView({
  children,
  data = [],
}: React.PropsWithChildren<CommunitiesListViewProps>) {
  const formatter = Intl.NumberFormat("en", { notation: "compact" });
  return (
    <Box>
      <Autocomplete />
      <Grid mt={10} gap={6} templateColumns="repeat(4, 1fr)">
        {data.map((community, index) => (
          <GridItem
            w="100%"
            border="1px solid"
            borderRadius="16px"
            borderColor="gray.200"
            p={6}
          >
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
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}