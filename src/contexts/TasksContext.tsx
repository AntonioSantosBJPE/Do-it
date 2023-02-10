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
  createDate?: string;
}

interface TasksContextData {
  tasks: Task[];
  createTask: (data: Omit<Task, "id">, accessToken: string) => Promise<void>;
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
  deleteTask: (taskId: string, accessToken: string) => Promise<void>;
  updateTask: (
    taskId: string,
    userId: string,
    accessToken: string,
    taskCompleted: boolean
  ) => Promise<void>;
  searchTask: (taskTitle: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  taskNotFound: string;
  clearStateTasks: () => void;
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
        clearStateTasks();
        signOut();
      }
      if (errorType?.toString() === "invalid signature") {
        clearStateTasks();
        signOut();
      }
    }
  }, []);

  const dateFormat = (): string => {
    let data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  };

  const createTask = useCallback(
    async (data: Omit<Task, "id">, accessToken: string) => {
      data.createDate = dateFormat();
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
            clearStateTasks();
            signOut();
          }
          if (errorType?.toString() === "invalid signature") {
            clearStateTasks();
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
            clearStateTasks();
            signOut();
          }
          if (errorType?.toString() === "invalid signature") {
            clearStateTasks();
            signOut();
          }
        });
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (
      taskId: string,
      userId: string,
      accessToken: string,
      taskCompleted: boolean
    ) => {
      await api
        .patch(
          `/tasks/${taskId}`,
          { completed: !taskCompleted, userId },
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
            searchId.completed = !taskCompleted;
          }
          setTasks(arrayTempTasks);
        })
        .catch((error) => {
          const currentError = error as AxiosError<iDefaultErrorResponse>;
          const errorType = currentError.response?.data;
          if (errorType?.toString() === "jwt expired") {
            clearStateTasks();
            signOut();
          }
          if (errorType?.toString() === "invalid signature") {
            clearStateTasks();
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

  const clearStateTasks = () => {
    setTasks([]);
  };
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
        clearStateTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
