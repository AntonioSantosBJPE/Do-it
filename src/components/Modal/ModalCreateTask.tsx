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
  VStack,
} from "@chakra-ui/react";
import { FaClipboard, FaExclamation } from "react-icons/fa";
import { Input } from "../Form/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextArea } from "../Form/TextArea";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TasksContext } from "../../contexts/TasksContext";

interface ModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateTaskData {
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

const CreateTaskSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  description: yup
    .string()
    .required("Campo obrigatório")
    .max(100, "Máximo de 100 caracteres"),
});

export const ModalCreateTask = ({ isOpen, onClose }: ModalCreateTaskProps) => {
  const { user, accessToken } = useContext(AuthContext);
  const { createTask } = useContext(TasksContext);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<CreateTaskData>({
    resolver: yupResolver(CreateTaskSchema),
  });

  const handleCreateTask: SubmitHandler<CreateTaskData> = (data) => {
    data = { ...data, userId: user.id, completed: false };
    createTask(data, accessToken).then((response) => {
      reset();
      onClose();
    });
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800" mr="15px" ml="15px" padding="30px 0px">
          <ModalHeader display="flex">
            <Center w="30px" h="30px" bg="purple.500" borderRadius="5px">
              <FaClipboard color="white" />
            </Center>
            <Text fontWeight="bold" ml="3">
              Adicionar
            </Text>
          </ModalHeader>
          <ModalCloseButton
            bg="purple.500"
            color="white"
            top={["45px", "20px", "20px"]}
            right="20px"
            _hover={{ bg: "purple.600" }}
          />
          <ModalBody as="form" onSubmit={handleSubmit(handleCreateTask)}>
            <VStack spacing="5">
              <Input
                label="Título"
                error={errors.title}
                placeholder="Digite o título"
                {...register("title")}
              />
              <TextArea
                label="Descrição"
                error={errors.description}
                placeholder="Digite sua descrição"
                {...register("description")}
              />

              <Button
                bg="purple.500"
                color="white"
                w="100%"
                h="60px"
                mt="4"
                _hover={{ bg: "purple.600" }}
                type="submit"
              >
                Adicionar Tarefa
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
