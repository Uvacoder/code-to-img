"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "libs/firebase";
import { User } from "firebase/auth";
import Error from "next/error";

export interface AuthcontextType {
  user: User;
  error: globalThis.Error;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthcontextType | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<globalThis.Error | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setError(null);
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw "useAuth must use inside AuthProvider";
  return context;
};
