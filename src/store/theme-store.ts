import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
};

const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: getInitialTheme(),

  toggleTheme: () => {
    const nextTheme =
      get().theme === "dark" ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);

    set({
      theme: nextTheme,
    });
  },
}));