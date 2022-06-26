import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    <authContext.Provider value={{ login, user, logout, loading }}>
      {children}
    </authContext.Provider>
  );
};
