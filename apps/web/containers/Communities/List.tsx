import {
  Flex,
  Grid,
  GridItem,
  Box,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import type { ICommunity } from '@reputable/types';
import NextLink from 'next/link';

interface CommunitiesListViewProps {
  data: ICommunity[];
}

export default function CommunitiesListView({
  children,
  data = [],
}: React.PropsWithChildren<CommunitiesListViewProps>) {
  return (
    <Box maxW="960px">
      <Grid gap={[4, 6]} templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}>
        {data.map((community, index) => (
          <NextLink
            key={`community_${index}`}
            href={`/${community.slug}`}
            passHref
          >
            <Link _hover={{ textDecoration: 'none' }}>
              <GridItem w="100%">
                <Box
                  border="1px solid"
                  borderRadius="16px"
                  borderColor="gray.200"
                  p={6}
                >
                  <Flex justify="center" align="center">
                    <VStack gap={3}>
                      <Box maxW="82px" maxH="82px">
                        <Image
                          src={community.icon}
                          alt={community.name}
                          width={100}
                          height={100}
                        />
                      </Box>
                      <Text
                        color="gray.800"
                        fontSize={['18px', '24px']}
                        lineHeight="32px"
                        fontWeight={600}
                      >
                        {community.name}
                      </Text>
                    </VStack>
                  </Flex>
                </Box>
              </GridItem>
            </Link>
          </NextLink>
        ))}
      </Grid>
    </Box>
  );
}
