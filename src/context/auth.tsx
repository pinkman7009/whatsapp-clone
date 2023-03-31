import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, ReactNode, ReactElement } from "react";
import { auth } from "../config/firebaseConfig";
import { User } from "../types";
import { ChildrenProps as AuthContextProviderProps } from "../types";

interface IAuthContext {
  currentUser: User;
}

export const AuthContext = createContext<IAuthContext>({
  currentUser: {
    displayName: "",
    email: "",
    uid: "",
  },
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>({
    uid: "",
    displayName: "",
    email: "",
  });

  useEffect(() => {
    const cleanup = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user as any);
    });

    return () => {
      cleanup();
    };
  }, []);

  return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
};
