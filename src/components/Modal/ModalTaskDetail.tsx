import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import {
  FaCheck,
  FaCube,
  FaExclamation,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { TasksContext } from "../../contexts/TasksContext";
import { theme } from "../../styles/theme";

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
  createDate?: string;
}
interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const ModalTaskDetail = ({
  isOpen,
  onClose,
  task,
}: ModalTaskDetailProps) => {
  const { updateTask, deleteTask } = useContext(TasksContext);
  const { accessToken, user } = useContext(AuthContext);
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="gray.800" mr="15px" ml="15px" padding="30px 0px">
          <ModalHeader display="flex" justifyContent="space-between">
            <Flex>
              <Center w="30px" h="30px" bg="purple.500" borderRadius="5px">
                <FaCube color="white" />
              </Center>
              <Text fontWeight="bold" ml="3">
                Vizualizar
              </Text>
            </Flex>
            <HStack spacing="2">
              <Center
                as="button"
                w="30px"
                h="30px"
                borderWidth="1px"
                borderRadius="5px"
                borderColor="gray.200"
                bgColor="white"
                onClick={() => {
                  deleteTask(task.id, accessToken);
                  onClose();
                }}
              >
                <FaTrash color={theme.colors.gray["300"]} />
              </Center>
              <Center
                as="button"
                w="30px"
                h="30px"
                borderWidth="1px"
                borderRadius="5px"
                borderColor="gray.200"
                bgColor="white"
                onClick={() => {
                  updateTask(task.id, user.id, accessToken, task.completed);
                }}
              >
                <FaCheck color={theme.colors.gray["300"]} />
              </Center>
              <Center
                onClick={onClose}
                as="button"
                ml="auto"
                w="32px"
                h="32px"
                bg="purple.500"
                fontSize="lg"
                borderRadius="md"
              >
                <FaTimes color={theme.colors.white} />
              </Center>
            </HStack>
          </ModalHeader>

          <ModalBody>
            <Heading as="h2" fontSize="2xl">
              {task.title}
            </Heading>
            <Text color="gray.400">{task.description}</Text>
          </ModalBody>
          <Box padding="6">
            <Progress
              colorScheme="purple"
              mt="2.5"
              value={task.completed ? 100 : 10}
            />
            <Text color="gray.200" mt="4">
              Criado em: {task.createDate}
            </Text>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
