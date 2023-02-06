import { AxiosError, AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";
import { AuthContext } from "./AuthContext";

interface TasksContextProps {
  children: ReactNode;
}

interface Task {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

interface TasksContextData {
  tasks: Task[];
  createTask: (data: Omit<Task, "id">, accessToken: string) => Promise<void>;
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
  updateTask: (
    taskId: string,
    userId: string,
    accessToken: string
  ) => Promise<void>;
  searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
}

interface iDefaultErrorResponse {
  message: string;
}

export const TasksContext = createContext<TasksContextData>(
  {} as TasksContextData
);

export const TasksProvider = ({ children }: TasksContextProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [taskNotFound, setTaskNotFound] = useState("");

  const { signOut } = useContext(AuthContext);

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get(`/tasks?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      const currentError = error as AxiosError<iDefaultErrorResponse>;
      const errorType = currentError.response?.data;

      if (errorType?.toString() === "jwt expired") {
        signOut();
      }
      if (errorType?.toString() === "invalid signature") {
        signOut();
      }
    }
  }, []);

  const createTask = useCallback(
    async (data: Omit<Task, "id">, accessToken: string) => {
      await api
        .post("/tasks", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<Task>) => {
          setTasks((oldTasks) => [...oldTasks, response.data]);
        })
        .catch((error) => {
          const currentError = error as AxiosError<iDefaultErrorResponse>;
          const errorType = currentError.response?.data;
          if (errorType?.toString() === "jwt expired") {
            signOut();
          }
          if (errorType?.toString() === "invalid signature") {
            signOut();
          }
        });
    },
    []
  );

  const deleteTask = useCallback(
    async (taskId: string, accessToken: string) => {
      await api
        .delete(`/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const filteredTasks = tasks.filter((task) => task.id !== taskId);
          setTasks(filteredTasks);
        })
        .catch((error) => {
          const currentError = error as AxiosError<iDefaultErrorResponse>;
          const errorType = currentError.response?.data;
          if (errorType?.toString() === "jwt expired") {
            signOut();
          }
          if (errorType?.toString() === "invalid signature") {
            signOut();
          }
        });
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (taskId: string, userId: string, accessToken: string) => {
      await api
        .patch(
          `/tasks/${taskId}`,
          { completed: true, userId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          const arrayTempTasks = [...tasks];

          const searchId = arrayTempTasks.find((item) => item.id === taskId);

          if (searchId) {
            searchId.completed = true;
          }
          setTasks(arrayTempTasks);
        })
        .catch((error) => {
          const currentError = error as AxiosError<iDefaultErrorResponse>;
          const errorType = currentError.response?.data;
          if (errorType?.toString() === "jwt expired") {
            signOut();
          }
          if (errorType?.toString() === "invalid signature") {
            signOut();
          }
        });
    },
    [tasks]
  );

  const searchTask = useCallback(
    async (taskTitle: string, accessToken: string) => {
      const response = await api.get(`/tasks?title_like=${taskTitle}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.data.length) {
        setTaskNotFound(taskTitle);
        setNotFound(true);
        return;
      }
      setNotFound(false);
      setTasks(response.data);
    },
    []
  );
  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        loadTasks,
        deleteTask,
        updateTask,
        searchTask,
        notFound,
        taskNotFound,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
