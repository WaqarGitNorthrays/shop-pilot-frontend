import { create } from "zustand";
import api from "../lib/axiosInstance";

interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  role?: string; // "user" | "admin"
  isAdmin?: boolean; // ✅ convenience flag
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (emailOrUsername: string, password: string) => Promise<void>;
  logout: () => void;
  checkStoredUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  // ✅ Register
  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/users/register", {
        username,
        email,
        password,
      });

      const data = response.data;
      const userData: User = {
        _id: data._id,
        username: data.username,
        email: data.email,
        token: data.token,
        role: data.role || "user",
        isAdmin: data.role === "admin",
      };

      // Save to localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      set({ user: userData, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Registration failed",
      });
    }
  },

  // ✅ Login
  login: async (emailOrUsername, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post("/users/login", {
        email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
        username: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
        password,
      });

      const data = response.data;
      const userData: User = {
        _id: data._id,
        username: data.username,
        email: data.email,
        token: data.token,
        role: data.role || "user",
        isAdmin: data.role === "admin",
      };

      // Save to localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));

      set({ user: userData, loading: false, error: null });
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Login failed",
      });
    }
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },

  // ✅ Restore session if user exists in localStorage
  checkStoredUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      set({
        user: {
          ...parsed,
          isAdmin: parsed.role === "admin",
        },
      });
    }
  },
}));
