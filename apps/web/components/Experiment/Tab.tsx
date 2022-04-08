import { Text } from "@chakra-ui/react";
import React from "react";

export interface TabProps {
  onClick: () => void;
  name: string;
}
export default function Tab({
  onClick,
  name,
}: React.PropsWithChildren<TabProps>) {
  return (
    <Text py={2} px={4.25} backgroundColor="primary.100">
      {name}
    </Text>
  );
}
