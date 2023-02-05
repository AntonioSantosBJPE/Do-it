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

interface TasksContextData {}

export const TasksContext = createContext<TasksContextData>(
  {} as TasksContextData
);

export const TasksProvider = ({ children }: TasksContextProps) => {
  const [tasks, setTasks] = useState([]);
  return <TasksContext.Provider value={{}}>{children}</TasksContext.Provider>;
};
