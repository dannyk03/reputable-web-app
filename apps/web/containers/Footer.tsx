import { Divider, Link, Icon, useTheme, VStack, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import Logo from "../components/Icons/Logo";

export default function Footer() {
  const theme = useTheme();
  return (
    <VStack gap={8} mb={8}>
      <Divider />
      <NextLink href={"/"} passHref>
        <Link>
          <Icon
            _focus={{ textDecoration: "none" }}
            as={Logo}
            w={["130px", "180px"]}
            h={["32px", "44px"]}
            fill={theme.colors.primary[800]}
          />
        </Link>
      </NextLink>
      <Text color="gray.400" fontWeight={500}>
        Terms of Use
      </Text>
      <Text color="gray.400" fontWeight={500}>
        © 2022 Reputable Inc. All rights reserved.
      </Text>
    </VStack>
  );
}
