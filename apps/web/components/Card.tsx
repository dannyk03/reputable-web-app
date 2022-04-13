import { Box, ChakraComponent, ChakraProps } from "@chakra-ui/react";
import React from "react";

export interface CardProps extends ChakraProps {
  noShadow?: boolean;
}

export default function Card({
  children,
  noShadow = false,
  ...restProps
}: React.PropsWithChildren<CardProps & React.ComponentProps<"div">>) {
  return (
    <Box
      shadow={!noShadow && "md"}
      borderWidth="1px"
      p={6}
      borderRadius="16px"
      overflow="hidden"
      {...restProps}
    >
      {children}
    </Box>
  );
}
