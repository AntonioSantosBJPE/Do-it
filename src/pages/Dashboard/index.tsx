import { Box, Button, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { AuthContext } from "../../contexts/AuthContext";
import { TasksContext } from "../../contexts/TasksContext";
interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}
export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { signOut, user, accessToken } = useContext(AuthContext);
  const { tasks, loadTasks } = useContext(TasksContext);

  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

  const {
    isOpen: isTaskDetailOpen,
    onClose: onTaskDetailClose,
    onOpen: onTaskDetailOpen,
  } = useDisclosure();

  useEffect(() => {
    loadTasks(user.id, accessToken)
      .then((response) => {
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

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
        <Grid
          templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
          gap="10"
          paddingX={["4", "8"]}
          mt="8"
          w="100%"
        >
          {tasks.map((task) => (
            <Card key={task.id} task={task} action={handleClick} />
          ))}
        </Grid>
      </Box>
    </>
  );
};
