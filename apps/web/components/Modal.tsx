import React from 'react';
import {
  Button,
  useDisclosure,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ChakraProps,
} from '@chakra-ui/react';

interface ModalProps extends ChakraProps {
  button: JSX.Element;
  title: string;
  closeButtonTitle?: string;
}

export default function Modal({
  children,
  button,
  title,
  closeButtonTitle,
}: React.PropsWithChildren<ModalProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {React.cloneElement(button, {
        ...(button.props || {}),
        onClick: () => onOpen(),
      })}

      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>

          {closeButtonTitle && closeButtonTitle !== 'hidden' && (
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                {closeButtonTitle}
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </ChakraModal>
    </>
  );
}

Modal.defaultProps = {
  closeButtonTitle: 'Close',
};
