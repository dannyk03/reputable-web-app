import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useCombobox, UseComboboxProps } from "downshift";
import { debounce } from "lodash";

import React, { useEffect, useMemo, useState } from "react";

interface AsyncAutocompleteProps<T> {
  fetchData: (inputValue: string) => Promise<T[]>;
  renderItem: (item: T) => JSX.Element;
  debounceMS?: number;
  onSelectedItemChange: UseComboboxProps<T>["onSelectedItemChange"];
}

export default function AutocompleteAsync<T>({
  fetchData,
  renderItem,
  debounceMS = 300,
  onSelectedItemChange: onSelectedItemChangeProp,
}: React.PropsWithChildren<AsyncAutocompleteProps<T>>) {
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedFetch = useMemo(() => debounce(fetchData, debounceMS), []);

  useEffect(() => {
    setLoading(true);
    debouncedFetch(inputValue).then((r: T[]) => {
      setItems(r);
    });
    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items,
    inputValue: inputValue,
    onSelectedItemChange: (changes) => {
      onSelectedItemChangeProp(changes);
    },
    onInputValueChange: ({ inputValue, type, isOpen }) => {
      setInputValue(inputValue);
    },
  });
  return (
    <Box>
      <InputGroup {...getComboboxProps()} variant="filled">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        {loading && (
          <InputRightElement pointerEvents="none">
            <CircularProgress isIndeterminate color="primary.200" />
          </InputRightElement>
        )}
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
          {items.map((item, index) => (
            <ListItem
              key={`searchResult_${index}`}
              {...getItemProps({ item, index })}
            >
              {renderItem(item)}
            </ListItem>
          ))}
        </Box>
      </UnorderedList>
    </Box>
  );
}
