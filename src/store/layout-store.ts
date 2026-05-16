import { create } from "zustand";

type LayoutStore = {
  isSidebarCollapsed: boolean;
  toggleSidebarCollapse: () => void;
};

const getInitialSidebarState = () => {
  return localStorage.getItem("sidebarCollapsed") === "true";
};

export const useLayoutStore = create<LayoutStore>((set, get) => ({
  isSidebarCollapsed: getInitialSidebarState(),

  toggleSidebarCollapse: () => {
    const nextValue = !get().isSidebarCollapsed;

    localStorage.setItem("sidebarCollapsed", String(nextValue));

    set({
      isSidebarCollapsed: nextValue,
    });
  },
}));