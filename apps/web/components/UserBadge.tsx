import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Collapse,
  useDisclosure,
  VStack,
  Box,
  HStack,
  Text,
  Avatar,
  LinkBox,
  LinkOverlay,
  ChakraProps,
} from "@chakra-ui/react";
import makeAvatar from "../helpers/makeAvatar";
import { useApiContext } from "../providers/ApiContext";
import NextLink from "next/link";
import React from "react";

export default function UserBadge({
  children,
  ...restProps
}: React.PropsWithChildren<ChakraProps>) {
  const { user } = useApiContext();
  const { logout } = useAuth0();
  const { onToggle, isOpen } = useDisclosure();
  return (
    <Box {...restProps}>
      <HStack
        py={2}
        px={4}
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
        <Text
          color="gray.700"
          lineHeight="24px"
          fontSize="16px"
          fontWeight={600}
        >
          {user.name}
        </Text>
        {!isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </HStack>
      <Box id="otlga" position="relative" />
      <Collapse in={isOpen} animateOpacity>
        <VStack
          mt="2px"
          borderRadius="12px"
          border="1px solid"
          borderColor="gray.200"
          position="absolute"
          backgroundColor="white"
          zIndex={2}
          p={3}
        >
          <LinkBox>
            <NextLink href="/my-experiments" passHref>
              <Text
                py={2}
                px={6}
                borderRadius="6px"
                fontWeight={500}
                size="16px"
                lineHeight="24px"
                _hover={{ backgroundColor: "primary.100", cursor: "pointer" }}
              >
                <LinkOverlay>My Experiments</LinkOverlay>
              </Text>
            </NextLink>
          </LinkBox>
          <Text
            py={2}
            px={6}
            w="100%"
            fontWeight={500}
            size="16px"
            lineHeight="24px"
            onClick={() => logout({ returnTo: window.location.origin })}
            borderRadius="6px"
            _hover={{ backgroundColor: "primary.100", cursor: "pointer" }}
          >
            Log out
          </Text>
        </VStack>
      </Collapse>
    </Box>
  );
}
