import { SearchIcon } from "@chakra-ui/icons";
import { CircularProgress, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import React from "react";

interface SearchInputProps {
  isLoading?: boolean
  onChange?: (value:string)=>void,
  value?: string,
  placeholder?: string,
  inputProps?: Record<any,any>
  inputGroupProps?: Record<any,any>
}

export default function SearchInput({value,isLoading,placeholder,onChange, inputProps, inputGroupProps}:React.PropsWithChildren<SearchInputProps>){
  return (
    <InputGroup variant="filled" {...inputGroupProps}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          {isLoading && (
            <InputRightElement pointerEvents="none">
              <CircularProgress
                size="24px"
                isIndeterminate
                color="primary.400"
              />
            </InputRightElement>
          )}
          <Input
            value={value}
            bgColor="gray.50"
            borderColor="gray.200"
            border="1px solid"
            borderRadius={24}
            onChange={(e)=>onChange(e.target.value)}
            placeholder={placeholder}
            _hover={{}}
            {...inputProps}
          />
        </InputGroup>
  )
}