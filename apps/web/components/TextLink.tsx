import { ChakraProps, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

export interface TextLinkProps extends ChakraProps {
  href: string | Record<string, any>;
  icon?: JSX.Element;
  label?: string;
}

export default function TextLink({
  href,
  icon,
  label,
  ...restProps
}: React.PropsWithChildren<TextLinkProps>) {
  return (
    <NextLink href={href} passHref>
      <Link w="fit-content" {...restProps}>
        <Flex w="fit-content" align="center">
          {icon}
          <Text fontWeight={600} color="gray.700" pl={2}>
            {label}
          </Text>
        </Flex>
      </Link>
    </NextLink>
  );
}
