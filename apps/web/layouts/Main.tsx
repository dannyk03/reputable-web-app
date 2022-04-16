import { Box, Container, Flex } from "@chakra-ui/react";
import Navbar from "../containers/Navbar";

export default function MainLayout({ children }) {
  return (
    <Container maxW="container.xl">
      <Navbar />
      <Flex w="100%" justify="center">
        {children}
      </Flex>
      <Box mt="62px"></Box>
    </Container>
  );
}
