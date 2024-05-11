import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService, fetchProfile } from "../services/authService";
import { PostMessageData } from "../types/message";
import { User } from "../types/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        const userProfile = await fetchProfile(data.access_token);
        setUser(userProfile);
        navigate("/dashboard");
        window.postMessage(
          { type: "token", data: data.access_token } as PostMessageData,
          "*"
        );
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/"); // Redirect to login page on logout
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userProfile = await fetchProfile(token);
          setUser(userProfile);
        } catch {
          logout();
        }
      }
    };
    initAuth();
  }, []); // No user from dependency array to avoid logout on user change

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
