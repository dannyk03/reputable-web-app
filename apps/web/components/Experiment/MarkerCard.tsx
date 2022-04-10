import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { BiHeart } from "react-icons/bi";
import { ExperimentResult, MarkerValueChangeType } from "../../types";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

export default function MarkerCard({
  marker,
  history = [],
  lastChange,
}: React.PropsWithChildren<ExperimentResult>) {
  const color =
    lastChange?.type === MarkerValueChangeType.POSITIVE
      ? "green.400"
      : "red.400";
  const icon = lastChange?.percentage > 0 ? TriangleUpIcon : TriangleDownIcon;
  const text = lastChange?.percentage > 0 ? "increase" : "decrease";
  return (
    <Box
      borderWidth="1px"
      p={6}
      borderRadius="lg"
      overflow="hidden"
      width="100%"
    >
      <Box>
        <Flex align="center" height={7}>
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
        <Flex ml={1} align="center">
          <Text
            fontSize="24px"
            fontWeight={600}
            lineHeight="32px"
            color="primary.500"
          >
            {history[0].markerValue.prettified}
          </Text>
          {lastChange && (
            <Flex align="center" ml={2}>
              <Icon width="10px" height="10px" as={icon} color={color} />
              <Text
                fontSize="14px"
                lineHeight="20px"
                fontWeight={400}
                color="gray.700"
                pl={1}
              >{`${Math.abs(lastChange.value)} ${marker.unit}`}</Text>
            </Flex>
          )}
        </Flex>
        <Flex>
          <Text
            color="gray.600"
            fontWeight={600}
            fontSize="14px"
          >{`(%${Math.abs(lastChange.percentage)} ${text})`}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
