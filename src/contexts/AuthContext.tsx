import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  signIn: (credentials: SingInCredencials) => Promise<void>;
  signOut: () => void;
  user: User;
  accessToken: string;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SingInCredencials {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Doit:acessToken");
    const user = localStorage.getItem("@Doit:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SingInCredencials) => {
    const response = await api.post("/login", { email, password });
    const { accessToken, user } = response.data;

    localStorage.setItem("@Doit:acessToken", accessToken);
    localStorage.setItem("@Doit:user", JSON.stringify(user));
    setData({ accessToken, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Doit:acessToken");
    localStorage.removeItem("@Doit:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        accessToken: data.accessToken,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
