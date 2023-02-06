import { useDisclosure } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { AuthContext } from "../../contexts/AuthContext";
import { TasksContext } from "../../contexts/TasksContext";
import { FirstTask } from "./FirstTask";
import { NotFound } from "./NotFound";
import { TaskList } from "./TaskList";
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
  const { tasks, loadTasks, notFound, taskNotFound } = useContext(TasksContext);

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

  if (notFound) {
    return (
      <NotFound
        isTaskDetailOpen={isTaskDetailOpen}
        onTaskDetailClose={onTaskDetailClose}
        selectedTask={selectedTask}
        taskNotFound={taskNotFound}
      />
    );
  }

  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      {!loading && !tasks.length ? (
        <FirstTask />
      ) : (
        <TaskList loading={loading} handleClick={handleClick} tasks={tasks} />
      )}
    </>
  );
};
