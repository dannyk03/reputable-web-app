import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useCombobox } from "downshift";
import Image from "next/image";
import React, { useState } from "react";
import { searchExperimentItems } from "../mockData";
import { useRouter } from "next/router";

interface AutocompleteProps {}

export default function Autocomplete() {
  const [inputItems, setInputItems] = useState(searchExperimentItems);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    inputValue: inputValue,
    onSelectedItemChange: ({ selectedItem }) => {
      router.push(`/experiments/${selectedItem._id}`);
    },
    onInputValueChange: ({ inputValue, type, isOpen }) => {
      setInputItems(
        searchExperimentItems.filter((item) =>
          item.title.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
      setInputValue(inputValue);
    },
  });
  return (
    <Box>
      <InputGroup {...getComboboxProps()} variant="filled">
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
          {...getInputProps()}
        />
      </InputGroup>
      <UnorderedList {...getMenuProps()} listStyleType="none" mx={0}>
        <Box
          zIndex={999}
          width="100%"
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.200"
          mt={1}
          p={3}
        >
          {inputItems.map((item, index) => (
            <ListItem
              key={`searchResult_${index}`}
              {...getItemProps({ item, index })}
            >
              <HStack
                py={3}
                color="gray.700"
                fontSize="16px"
                fontWeight={400}
                lineHeight="24px"
                _hover={{ bgColor: "primary.100" }}
                px={6}
              >
                <Text textDecoration="none">{item.title}</Text>
                {item.communities.map((community, idx) => (
                  <HStack
                    key={`searchResultCommunity_${idx}`}
                    py={1}
                    px={3}
                    height={7}
                    borderRadius="12px"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ bgColor: "primary.200" }}
                  >
                    <Image
                      src={community.icon}
                      width="16px"
                      height="16px"
                      alt={community.name}
                    />
                    <Text
                      fontSize="14px"
                      fontWeight={400}
                      lineHeight="20px"
                      color="gray.700"
                    >
                      {community.name}
                    </Text>
                  </HStack>
                ))}
              </HStack>
            </ListItem>
          ))}
        </Box>
      </UnorderedList>
    </Box>
  );
}
