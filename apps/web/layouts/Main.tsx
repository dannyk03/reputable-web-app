import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <Container maxW="container.xl">
      <Navbar />
      <main>{children}</main>
      <Box mt="62px"></Box>
    </Container>
  );
}
