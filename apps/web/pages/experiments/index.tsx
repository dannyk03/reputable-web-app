import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export default function _() {
  return (
    <Flex justify={"center"}>
      <InputGroup variant="filled">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          bgColor="gray.50"
          borderColor="gray.200"
          border="1px solid"
          borderRadius={24}
          _hover={{}}
          type="tel"
          placeholder="Search an experiment"
        />
      </InputGroup>
      <Flex gap={6}>
        <Box
          maxWidth="223px"
          border="1px solid"
          borderRadius="16px"
          borderColor="gray.200"
        ></Box>
      </Flex>
    </Flex>
  );
}
