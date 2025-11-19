import { create } from "zustand";

export const useModuleStore = create((set) => ({
  modules: [],

  addModule: (module) =>
    set((state) => ({
      modules: [...state.modules, { id: Date.now(), ...module }],
    })),

  deleteModule: (id) =>
    set((state) => ({
      modules: state.modules.filter((module) => module.id !== id),
    })),
}));
