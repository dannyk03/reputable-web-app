import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Icon,
  useTheme,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import Logo from "../components/Icons/Logo";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";
import NextLink from "next/link";
import { useApiContext } from "../providers/ApiContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Show, Hide } from "@chakra-ui/react";
import UserBadge from "../components/UserBadge";

export default function Navbar() {
  const theme = useTheme();
  const { loginWithRedirect, user } = useAuth0();
  const { user: APIUser } = useApiContext();
  return (
    <Flex flexDirection="column">
      <HStack py={[4, 10]} alignContent="center">
        <NextLink href={"/"} passHref>
          <Link>
            <Icon
              _focus={{ textDecoration: "none" }}
              as={Logo}
              mt={[1, 0]}
              w={["130px", "180px"]}
              h={["32px", "44px"]}
              fill={theme.colors.primary[800]}
            />
          </Link>
        </NextLink>
        <Spacer />
        {!user ? (
          <>
            <Hide below="md">
              <Box
                py={2}
                px={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="24px"
                _hover={{ cursor: "pointer" }}
                onClick={() =>
                  loginWithRedirect({
                    audience: "https://api.reputable.health",
                  })
                }
              >
                <Text>Sign in</Text>
              </Box>
            </Hide>
            <Show below="md">
              <Button variant="ghost">
                <Icon
                  as={FiLogIn}
                  w="38px"
                  h="38px"
                  p={2}
                  onClick={() =>
                    loginWithRedirect({
                      audience: "https://api.reputable.health",
                    })
                  }
                ></Icon>
              </Button>
            </Show>
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
                  {APIUser?.user_metadata?.tokens} REPT
                </Text>
              </HStack>
              <UserBadge w="fit-content" />
            </HStack>
          </>
        )}
      </HStack>
      <Divider mb={10} />
    </Flex>
  );
}
