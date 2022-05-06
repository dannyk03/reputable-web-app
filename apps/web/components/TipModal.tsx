import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Icon,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { useTipExperiment } from "../_api/Experiments/mutations";
import { PrimaryButton } from "./Button";
import ReputableLogo from "./Icons/ReputableLogo";

/**
 * Children of this tooltip will be used as the trigger for tooltip
 * @returns
 */
export default function TipModal({
  children,
  experimentId,
}: React.PropsWithChildren<{ experimentId: string }>) {
  const [value, setValue] = React.useState("1");

  const { mutate, isLoading } = useTipExperiment(experimentId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  return (
    <>
      {React.cloneElement(children as JSX.Element, {
        ...((children as JSX.Element).props || {}),
        onClick: () => onOpen(),
      })}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tip this experiment</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            <HStack justify={"center"} align="start">
              <NumberInput
                maxW={32}
                onChange={(val) => setValue(val)}
                value={value}
                max={10}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <PrimaryButton
                disabled={isLoading}
                w="30%"
                text="Tip REPT"
                onClick={() => mutate({ experimentId, tip: parseInt(value) })}
                leftIcon={
                  <Icon
                    as={ReputableLogo}
                    color="white"
                    width="16px"
                    height="16px"
                  />
                }
              />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
