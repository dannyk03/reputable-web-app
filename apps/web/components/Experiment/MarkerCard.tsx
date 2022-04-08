import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { BiHeart } from "react-icons/bi";
import { ExperimentResult } from "../../pages/_app";

export default function MarkerCard({
  marker,
  history = [],
}: React.PropsWithChildren<ExperimentResult>) {
  const lastValue = history[0].value;

  return (
    <Box
      borderWidth="1px"
      p={6}
      borderRadius="lg"
      overflow="hidden"
      width="100%"
    >
      <Flex>
        <Flex justify="center" align="center">
          <Icon as={BiHeart} width="24px" height="24px" color="secondary.100" />
          <Text
            pl={2}
            color="gray.700"
            fontSize="20px"
            fontWeight={600}
            lineHeight="28px"
          >
            {marker.name}
          </Text>
        </Flex>
        <Flex>
          <Text color="primary.500"></Text>
        </Flex>
      </Flex>
    </Box>
  );
}
