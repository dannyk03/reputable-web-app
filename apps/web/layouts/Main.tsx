import { Box, Container, Flex, Hide, Show } from "@chakra-ui/react";
import Footer from "../containers/Footer";
import Navbar from "../containers/Navbar";

export default function MainLayout({ children }) {
  return (
    <Container maxW="container.xl">
      <Navbar />
      <Flex w="100%" justify="center">
        {children}
      </Flex>
      <Box mt="62px"></Box>
      <Show below="md">
        <Footer />
      </Show>
    </Container>
  );
}
