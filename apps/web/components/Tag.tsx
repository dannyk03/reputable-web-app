import { Text } from "@chakra-ui/react";

export default function Tag({ children, ...restProps }) {
  return (
    <Text
      fontSize={14}
      color="primary.700"
      backgroundColor="primary.100"
      borderRadius="xl"
      py="1"
      px="3"
      lineHeight={"20px"}
      {...restProps}
    >
      {children}
    </Text>
  );
}
