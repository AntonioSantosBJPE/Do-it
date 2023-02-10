import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
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

interface CardProps {
  task: Task;
  action: (task: Task) => void;
}
export const Card = ({ task, action }: CardProps) => {
  const { updateTask, deleteTask } = useContext(TasksContext);
  const { accessToken, user } = useContext(AuthContext);

  return (
    <Box
      cursor="pointer"
      _hover={{
        transform: "translateY(-7px)",
        borderColor: "gray.100",
      }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="base"
      padding="7"
      w={["91vw", "auto"]}
    >
      <Flex justify="space-between">
        <Heading as="h2" size="md" onClick={() => action(task)}>
          {task.title}
        </Heading>
        <HStack spacing="4">
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bgColor="white"
            onClick={() => deleteTask(task.id, accessToken)}
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
            onClick={() =>
              updateTask(task.id, user.id, accessToken, task.completed)
            }
          >
            <FaCheck color={theme.colors.gray["300"]} />
          </Center>
        </HStack>
      </Flex>
      <Box w="100%" mt="4" onClick={() => action(task)}>
        <Text>{task.description}</Text>
        <Progress
          colorScheme="purple"
          mt="2.5"
          value={task.completed ? 100 : 10}
        />
        <Text color="gray.200"> Criado em: {task.createDate}</Text>
      </Box>
    </Box>
  );
};
