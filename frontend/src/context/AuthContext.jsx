import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // LOAD USER ON REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // REGISTER
  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);

    localStorage.setItem("token",data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // LOGIN
  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);

    localStorage.setItem("token",data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    
    setUser(data.user);
    setIsAuthenticated(true);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);