import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  CircularProgress,
  Collapse,
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
import NoSSR from "../NoSSR";

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
  ...restProps
}: React.PropsWithChildren<AsyncAutocompleteProps<T>>) {
  const [items, setItems] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const debouncedFetch = useMemo(() => {
    const fetcher = (inputValue: string) => (
      setLoading(true),
      fetchData(inputValue)
        .then((items) => setItems(items))
        .finally(() => setLoading(false))
    );
    return debounce(fetcher, debounceMS);
  }, [debounceMS, fetchData]);

  useEffect(() => {
    if (inputValue.trim() !== "") debouncedFetch(inputValue);
    return () => {
      debouncedFetch.cancel();
    };
  }, [inputValue, debouncedFetch]);

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
    <NoSSR>
      <Box {...restProps}>
        <InputGroup {...getComboboxProps()} variant="filled">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          {loading && (
            <InputRightElement pointerEvents="none">
              <CircularProgress
                size="24px"
                isIndeterminate
                color="primary.400"
              />
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
          <Collapse in={isOpen} animateOpacity>
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
          </Collapse>
        </UnorderedList>
      </Box>
    </NoSSR>
  );
}
