import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

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
}

export const TasksContext = createContext<TasksContextData>(
  {} as TasksContextData
);

export const TasksProvider = ({ children }: TasksContextProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = useCallback(
    async (data: Omit<Task, "id">, accessToken: string) => {
      api
        .post("/tasks", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<Task>) => {
          setTasks((oldTasks) => [...oldTasks, response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    []
  );

  return (
    <TasksContext.Provider value={{ tasks, createTask }}>
      {children}
    </TasksContext.Provider>
  );
};
