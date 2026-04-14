import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: "buyer" | "seller") => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("auth_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string, role?: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData: User = {
      id: "1",
      name: "John Doe",
      email: email,
      role: (role as "buyer" | "seller") || "buyer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    };
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const signup = async (name: string, email: string, password: string, role: "buyer" | "seller") => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData: User = {
      id: "1",
      name: name,
      email: email,
      role: role,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    };
    setUser(userData);
    localStorage.setItem("auth_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
