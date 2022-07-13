import { Box, Container, Flex, Hide, Show } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Footer from '../containers/Footer';
import Navbar from '../containers/Navbar';
import { getPageTitle } from '../utils';

export default function MainLayout({ children }) {
  return (
    <Container maxW="container.xl">
      <NextSeo title={getPageTitle()} />
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
