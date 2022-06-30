import { Box, Container, Flex, Hide, Show } from '@chakra-ui/react';
import Head from 'next/head';
import Footer from '../containers/Footer';
import Navbar from '../containers/Navbar';
import { getPageTitle } from '../utils';

export default function MainLayout({ children }) {
  return (
    <Container maxW="container.xl">
      <Head>
        <title>{getPageTitle()}</title>
      </Head>
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
