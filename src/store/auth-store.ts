import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const getInitialAuthState = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: getInitialAuthState(),

  login: () => {
    localStorage.setItem("isAuthenticated", "true");
    set({ isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("isAuthenticated");
    set({ isAuthenticated: false });
  },
}));