import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FaExclamation } from "react-icons/fa";

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  messagePrimary: string;
  messageSecondary: string;
  buttonMessage: string;
  buttonAction: () => void;
}

export const ModalSuccess = ({
  isOpen,
  onClose,
  messagePrimary,
  messageSecondary,
  buttonMessage,
  buttonAction,
}: ModalSuccessProps) => {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800" mr="15px" ml="15px" padding="30px 0px">
          <ModalHeader display="flex">
            <Center w="30px" h="30px" bg="purple.500" borderRadius="5px">
              <FaExclamation color="white" />
            </Center>
            <Text fontWeight="bold" ml="3">
              Yeess..
            </Text>
          </ModalHeader>
          <ModalCloseButton
            bg="purple.500"
            color="white"
            top={["45px", "20px", "20px"]}
            right="20px"
            _hover={{ bg: "purple.600" }}
          />
          <ModalBody>
            <Text
              align="center"
              dangerouslySetInnerHTML={{ __html: messagePrimary }}
            ></Text>

            <Button
              bg="purple.500"
              color="white"
              w="100%"
              h="60px"
              mt="4"
              _hover={{ bg: "purple.600" }}
              onClick={() => {
                onClose();
                buttonAction();
              }}
            >
              {buttonMessage}
            </Button>
          </ModalBody>

          <ModalFooter>
            <Text
              align="center"
              dangerouslySetInnerHTML={{ __html: messageSecondary }}
            ></Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
