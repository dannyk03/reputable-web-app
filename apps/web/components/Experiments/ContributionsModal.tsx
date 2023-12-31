import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  HStack,
  VStack,
  Icon,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import type { ITip } from "@reputable/types";
import React from "react";
import calculateContributions from "../../helpers/calculateContributions";
import ReputableLogo from "../Icons/ReputableLogo";

interface ContributionsModalProps {
  tips: ITip[];
}

/**
 * Children of this tooltip will be used as the trigger for tooltip
 * @returns
 */
export default function ContributionsModal({
  children,
  tips,
}: React.PropsWithChildren<ContributionsModalProps>) {
  const { totalTokens, matchedAmount, tokensTipped } =
    calculateContributions(tips);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  return (
    <>
      {React.cloneElement(children as JSX.Element, {
        ...((children as JSX.Element).props || {}),
        onClick: () => onOpen(),
      })}
      <Modal
        size="sm"
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contributions</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <VStack justify={"flex-start"} align="start">
              <HStack align="center">
                <Icon as={ReputableLogo} width="18px" height="18px" />
                <Text size="18px" fontWeight={600} lineHeight="28px">
                  {tokensTipped}
                </Text>
                <Text>REPT received from the community</Text>
              </HStack>
              <HStack align="center">
                <Icon as={ReputableLogo} width="18px" height="18px" />
                <Text size="18px" fontWeight={600} lineHeight="28px">
                  {matchedAmount}
                </Text>
                <Text>REPT matched by Reputable</Text>
              </HStack>
              <Divider />
              <HStack align="center">
                <Icon as={ReputableLogo} width="18px" height="18px" />
                <Text size="18px" fontWeight={600} lineHeight="28px">
                  {`= ${totalTokens}`}
                </Text>
                <Text>total</Text>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
