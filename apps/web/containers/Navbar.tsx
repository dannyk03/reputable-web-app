import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Icon,
  useTheme,
  Text,
  Avatar,
  Link,
} from "@chakra-ui/react";
import Logo from "../components/Icons/Logo";
import { useAuth0 } from "@auth0/auth0-react";
import makeAvatar from "../helpers/makeAvatar";
import { BiBell } from "react-icons/bi";
import Image from "next/image";
import NextLink from "next/link";

export default function Navbar() {
  const theme = useTheme();
  const { loginWithRedirect, user, loginWithPopup } = useAuth0();
  return (
    <Flex flexDirection="column">
      <HStack py={10}>
        <NextLink href={"/"} passHref>
          <Link>
            <Icon
              as={Logo}
              w="180px"
              h="44px"
              fill={theme.colors.primary[800]}
            />
          </Link>
        </NextLink>
        <Spacer />
        {!user ? (
          <>
            <Box
              py={2}
              px={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="24px"
              _hover={{ cursor: "pointer" }}
            >
              <Text>Sign up</Text>
            </Box>
            <Box
              py={2}
              px={4}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="24px"
              _hover={{ cursor: "pointer" }}
              onClick={() =>
                loginWithPopup({ audience: "https://api.reputable.health" })
              }
            >
              <Text>Sign in</Text>
            </Box>
          </>
        ) : (
          <>
            <HStack>
              <HStack
                py={2}
                px={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="24px"
              >
                <Image
                  width={"24px"}
                  height={"24px"}
                  alt="User Tokens"
                  src="/LogoVector.svg"
                />
                <Text
                  color="gray.700"
                  lineHeight="24px"
                  fontSize="16px"
                  fontWeight={600}
                >
                  2838 REPT
                </Text>
              </HStack>
              <HStack
                py={2}
                px={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="24px"
              >
                <Avatar
                  width={"24px"}
                  height={"24px"}
                  name="Profile Photo"
                  src={user.profileImage ?? makeAvatar(user.sub)}
                />
                <Text
                  color="gray.700"
                  lineHeight="24px"
                  fontSize="16px"
                  fontWeight={600}
                >
                  {user.given_name}
                </Text>
              </HStack>
              <Flex
                borderRadius="50%"
                border="1px solid"
                p="10px"
                justify="center"
                borderColor="gray.200"
                align="center"
                position="relative"
              >
                <Icon as={BiBell} w="20px" h="20px" />
                <Box
                  bgColor="primary.500"
                  position={"absolute"}
                  w="12.5px"
                  h="12.5px"
                  right="-2px"
                  bottom="0px"
                  borderRadius="50%"
                />
              </Flex>
            </HStack>
          </>
        )}
      </HStack>
      <Divider mb={10} />
    </Flex>
  );
}
