import { Box, Divider, Flex } from "@chakra-ui/react";
import Image from "next/image";

export default function Navbar() {
  return (
    <Flex flexDirection="column">
      <Box py={10}>
        <Image src="/Logo.svg" alt="Reputable" width="180" height="44" />
      </Box>
      <Divider mb={10} />
    </Flex>
  );
}
