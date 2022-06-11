import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Collapse,
  useDisclosure,
  VStack,
  Box,
  HStack,
  Text,
  Hide,
  Avatar,
  ChakraProps,
  Link,
} from "@chakra-ui/react";
import makeAvatar from "../helpers/makeAvatar";
import NextLink from "next/link";
import React from "react";
import { ClickOutside } from "../hooks/useClickOutside";

export default function UserBadge({
  children,
  ...restProps
}: React.PropsWithChildren<ChakraProps>) {
  const { logout, user } = useAuth0();
  const { onToggle, isOpen } = useDisclosure();
  return (
    <ClickOutside
      onClickOutside={() => {
        if (isOpen) onToggle();
      }}
    >
      <Box {...restProps}>
        <HStack
          py={2}
          px={[2, 4]}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="24px"
          onClick={onToggle}
          _hover={{ cursor: "pointer" }}
        >
          <Avatar
            width={"24px"}
            height={"24px"}
            name="Profile Photo"
            src={user.picture ?? makeAvatar(user.user_id)}
          />
          <Hide below="md">
            <Text
              color="gray.700"
              lineHeight="24px"
              fontSize="16px"
              fontWeight={600}
            >
              {user.name}
            </Text>
            {!isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </Hide>
        </HStack>
        <Box position="relative" />
        <Collapse in={isOpen} animateOpacity>
          <VStack
            mt="2px"
            borderRadius="12px"
            border="1px solid"
            right={4}
            borderColor="gray.200"
            position="absolute"
            backgroundColor="white"
            zIndex={2}
            p={3}
          >
            <NextLink href={`/user/${encodeURIComponent(user.email)}`} passHref>
              <Link>
                <Text
                  py={2}
                  px={6}
                  borderRadius="6px"
                  fontWeight={500}
                  size="16px"
                  lineHeight="24px"
                  _hover={{
                    backgroundColor: "primary.100",
                    cursor: "pointer",
                    textDecor: "none",
                  }}
                >
                  My Experiments
                </Text>
              </Link>
            </NextLink>
            <Text
              py={2}
              px={6}
              w="100%"
              fontWeight={500}
              size="16px"
              lineHeight="24px"
              onClick={() => {
                logout({ returnTo: window.location.origin });
              }}
              borderRadius="6px"
              _hover={{ backgroundColor: "primary.100", cursor: "pointer" }}
            >
              Log out
            </Text>
          </VStack>
        </Collapse>
      </Box>
    </ClickOutside>
  );
}
