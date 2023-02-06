import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { TasksProvider } from "../contexts/TasksContext";
import { theme } from "../styles/theme";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <AuthProvider>
        <TasksProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </TasksProvider>
      </AuthProvider>
    </>
  );
};
