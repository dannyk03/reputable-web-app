import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Progress,
  Icon,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useTipExperiment } from '../_api/Experiments/mutations';
import { useTipUser } from '../_api/Users/mutations';
import { PrimaryButton } from './Button';
import ReputableLogo from './Icons/ReputableLogo';

/**
 * Children of this tooltip will be used as the trigger for tooltip
 * @returns
 */
export default function TipModal({
  children,
  experimentId,
  userId,
}: React.PropsWithChildren<{ experimentId?: string; userId?: string }>) {
  const [value, setValue] = React.useState('1');
  const tipExperimentHook = useTipExperiment(experimentId);
  const tipUserHook = useTipUser(userId, experimentId);
  let mutate, isSuccess, isLoading;
  if (userId) {
    mutate = tipUserHook.mutate;
    isSuccess = tipUserHook.isSuccess;
    isLoading = tipUserHook.isLoading;
  } else {
    mutate = tipExperimentHook.mutate;
    isSuccess = tipExperimentHook.isSuccess;
    isLoading = tipExperimentHook.isLoading;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose]);

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
          {isLoading && (
            <Progress size="xs" isIndeterminate color="primary.500" />
          )}
          <ModalHeader>Tip this experiment</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={3}>
            <HStack justify={'center'} align="start">
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
                onClick={() => {
                  mutate({ tip: parseInt(value) });
                }}
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
