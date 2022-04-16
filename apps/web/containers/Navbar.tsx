import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Spacer,
  Icon,
  useTheme,
  Text,
} from "@chakra-ui/react";
import Logo from "../components/Icons/Logo";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const theme = useTheme();
  const { loginWithRedirect } = useAuth0();
  return (
    <Flex flexDirection="column">
      <HStack py={10}>
        <Icon as={Logo} w="180px" h="44px" fill={theme.colors.primary[800]} />
        <Spacer />
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
          onClick={() => loginWithRedirect()}
        >
          <Text>Sign in</Text>
        </Box>
      </HStack>
      <Divider mb={10} />
    </Flex>
  );
}
