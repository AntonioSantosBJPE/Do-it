import {
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

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
  messageSecondary: string;
}

export const ModalError = ({
  isOpen,
  onClose,
  errorMessage,
  messageSecondary,
}: ModalErrorProps) => {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800" mr="15px" ml="15px" padding="30px 0px">
          <ModalHeader display="flex">
            <Center w="30px" h="30px" bg="red.500" borderRadius="5px">
              <FaExclamation color="white" />
            </Center>
            <Text fontWeight="bold" ml="3">
              Oops..
            </Text>
          </ModalHeader>
          <ModalCloseButton
            bg="red.500"
            color="white"
            top={["45px", "20px", "20px"]}
            _hover={{ bg: "red.600" }}
            right="20px"
          />
          <ModalBody>
            <Text align="center">
              Ocorreu algum erro ! <b>{errorMessage}</b>
            </Text>
            <Button
              bg="red.500"
              color="white"
              w="100%"
              h="60px"
              mt="4"
              _hover={{ bg: "red.600" }}
              onClick={onClose}
            >
              Tentar Novamente
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
