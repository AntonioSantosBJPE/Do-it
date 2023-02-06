import { Box, Center, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}
interface NotFoundProps {
  taskNotFound: string;
  isTaskDetailOpen: boolean;
  onTaskDetailClose: () => void;
  selectedTask: Task;
}

export const NotFound = ({
  taskNotFound,
  isTaskDetailOpen,
  onTaskDetailClose,
  selectedTask,
}: NotFoundProps) => {
  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      <Box>
        <Header />
        <SearchBox />
        <Center mt="4" textAlign="center" display="flex" flexDir="column">
          <Heading>Não encontramos resultados para:</Heading>
          <Text fontSize="xl" color="gray.300" fontWeight="bold">
            {taskNotFound}
          </Text>
          <Box
            mt="6"
            w={["80%", "40%"]}
            padding="6"
            boxShadow="base"
            bg="white"
          >
            <Stack>
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="20px"
                w="80%"
                borderRadius="20px"
              />
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="20px"
                w="65%"
                borderRadius="20px"
              />
            </Stack>
            <Stack mt="8">
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="15px"
                borderRadius="15px"
              />
              <Skeleton
                startColor="gray.100"
                endColor="gray.200"
                h="15px"
                borderRadius="15px"
              />
            </Stack>
          </Box>
        </Center>
      </Box>
    </>
  );
};
