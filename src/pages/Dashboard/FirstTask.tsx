import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { Header } from "../../components/Header";
import { ModalCreateTask } from "../../components/Modal/ModalCreateTask";

interface FirstTaskProps {}
export const FirstTask = ({}: FirstTaskProps) => {
  const {
    isOpen: isCreateTaskOpen,
    onClose: onCreateTaskClose,
    onOpen: onCreateTaskOpen,
  } = useDisclosure();
  return (
    <>
      <ModalCreateTask isOpen={isCreateTaskOpen} onClose={onCreateTaskClose} />
      <Header />
      <Box
        mt="4"
        w="90vw"
        paddingY="16"
        paddingX={["6", "0"]}
        ml="5vw"
        justifyContent="center"
        textAlign="center"
        borderWidth="2px"
        borderColor="gray.200"
        borderStyle="dashed"
      >
        <Center fontSize="5xl">
          <FaClipboard color="#bdbdbd" />
        </Center>
        <Heading fontSize="3xl" as="h2" mt="4">
          Vamos criar sua primeira tarefa
        </Heading>
        <Text color="gray.400">
          Insira sua meta e mostre a você mesmo sua <br /> capacidade em cumprir
          <b> suas atividades</b>
        </Text>
        <Button
          padding="6"
          mt="6"
          color="white"
          bg="purple.800"
          _hover={{ bg: "purple.900" }}
          onClick={onCreateTaskOpen}
        >
          Criar sua primeira tarefa
        </Button>
      </Box>
    </>
  );
};
