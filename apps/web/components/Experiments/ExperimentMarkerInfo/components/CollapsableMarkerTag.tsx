import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, HStack, useDisclosure, Text } from "@chakra-ui/react";
import { IExperimentResultMarker } from "@reputable/types";
import React from "react";
import Tag, { TagProps } from "../../../Tag";

interface Props extends TagProps {
  marker: IExperimentResultMarker;
}

export default function CollapsableMarkerTag({
  marker,
  ...restProps
}: React.PropsWithChildren<Props>) {
  const { isOpen, onToggle } = useDisclosure();
  const hasDevices = marker.devices.length > 0;
  return (
    <Tag
      w="fit-content"
      _hover={{ cursor: "pointer" }}
      onClick={onToggle}
      {...restProps}
    >
      <HStack>
        <Box pl={3} fontSize="16px" color="primary.600" fontWeight={500}>
          <li>{marker.name}</li>
        </Box>
        {hasDevices ? !isOpen ? <ChevronDownIcon /> : <ChevronUpIcon /> : <></>}
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <Box pl={3}>
          {marker.devices.map((device) => (
            <Text color="gray.600" size="18px" lineHeight="28px">
              {device}
            </Text>
          ))}
        </Box>
      </Collapse>
    </Tag>
  );
}
