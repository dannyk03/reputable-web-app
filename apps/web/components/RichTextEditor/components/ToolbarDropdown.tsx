import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Collapse, Flex, useDisclosure, VStack } from "@chakra-ui/react";

export default function ToolbarDropdown({
  onChange,
  currentState,
  options,
  w,
  h,
  placeholder,
  ...rest
}) {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <VStack position="relative">
      <Flex
        placeholder={placeholder}
        onClick={onToggle}
        w={w}
        h={h}
        align="center"
        justify={"space-between"}
        border="1px solid"
        borderColor="gray.200"
        p={1}
      >
        {currentState.blockType}
        <ChevronDownIcon />
      </Flex>
      <Box w={0} h={0} position="absolute" top="22px" left="0px">
        <Box
          w={w}
          maxH="200px"
          overflow="scroll"
          position={"relative"}
          backgroundColor="white"
          border="1px solid"
          borderTop="none"
          borderColor="gray.200"
          zIndex={22}
        >
          <Collapse in={isOpen} animateOpacity>
            {options.map((opt) => (
              <Box
                p={1}
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "gray.300",
                }}
                onClick={() => {
                  onChange(opt);
                  onToggle();
                }}
              >
                {opt}
              </Box>
            ))}
          </Collapse>
        </Box>
      </Box>
    </VStack>
  );
}
