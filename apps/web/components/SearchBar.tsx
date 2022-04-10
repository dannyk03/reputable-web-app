import { HStack, Text } from "@chakra-ui/react";
import { UseComboboxProps } from "downshift";
import Image from "next/image";
import { useRouter } from "next/router";
import mockApiCall from "../helpers/fakeApiCall";
import { searchExperimentItems } from "../mockData";
import { ExperimentSearchResult } from "../types";
import AutocompleteAsync from "./Autocomplete/Async";

export const SearchBarItem = (item: ExperimentSearchResult) => (
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
);

export default function SearchBar() {
  const fetchResults = (inputValue: string) =>
    mockApiCall(
      searchExperimentItems.filter((s) =>
        s.title.toLocaleLowerCase().startsWith(inputValue.toLocaleLowerCase())
      ),
      600
    );
  const router = useRouter();

  return (
    <AutocompleteAsync<ExperimentSearchResult>
      renderItem={SearchBarItem}
      fetchData={fetchResults}
      onSelectedItemChange={({ selectedItem }) => {
        router.push(`/experiments/${selectedItem._id}`);
      }}
    />
  );
}
