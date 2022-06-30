import { ChakraProps, Text, TextProps } from '@chakra-ui/react';
import React from 'react';

export interface TagProps extends TextProps {}

export default function Tag({
  children,
  ...restProps
}: React.PropsWithChildren<TagProps>) {
  return (
    <Text
      fontSize={14}
      color="primary.700"
      backgroundColor="primary.100"
      borderRadius="xl"
      py="1"
      px="3"
      lineHeight={'20px'}
      as="div"
      {...restProps}
    >
      {children}
    </Text>
  );
}
