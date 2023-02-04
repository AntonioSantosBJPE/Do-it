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

// const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// };

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
    console.log({ email, password });

    const response = await api.post("/login", { email, password });
    console.log(response);
    const { accessToken, user } = response.data;

    localStorage.setItem("@Doit:acessToken", accessToken);
    localStorage.setItem("@Doit:user", JSON.stringify(user));
    setData({ accessToken, user });
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, accessToken: data.accessToken, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
