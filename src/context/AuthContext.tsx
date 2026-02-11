import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as api from "../services/api";
import type { AuthUser, User } from "../types";

// It check if the jwt token is expired
// it decode the payload and make a comparaison from now
const isTokenExpired = (token: string): boolean => {
  try {
    //it split in three parts the part of payloadm then base64 and parse the json
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    //if the error is true then we consider the token is expired by safety.
    return true;
  }
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (nom: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  //usecallback for stop the re renders
  // [] = no dependences the function won't be recreated
  const logout = useCallback(() => {
    //clean the react state
    setToken(null);
    setUser(null);
    //clean the localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      //verify is the token isn't expired
      if (isTokenExpired(storedToken)) {
        //if yes then byyye
        logout();
        return; // stop the execution
      }
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, [logout]);

  const login = async (email: string, password: string) => {
    const response: AuthUser = await api.login(email, password);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  const register = async (nom: string, email: string, password: string) => {
    await api.register(nom, email, password);
    // after the user is registered, we can log them in automatically
    await login(email, password);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("UseAuth doit etre utilise dans un AuthProvider");
  }
  return context;
};
