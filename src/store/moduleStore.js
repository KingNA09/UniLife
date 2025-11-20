import { create } from "zustand";

// hydrate modules from localStorage if present
const storedModules = (() => {
  try {
    const raw = localStorage.getItem("unilife_modules");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
})();

export const useModuleStore = create((set) => ({
  modules: storedModules ?? [],

  addModule: (module) =>
    set((state) => ({
      modules: [...state.modules, { id: Date.now(), ...module }],
    })),

  updateModule: (id, updated) =>
    set((state) => ({
      modules: state.modules.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    })),

  deleteModule: (id) =>
    set((state) => ({
      modules: state.modules.filter((module) => module.id !== id),
    })),
}));

// persist modules to localStorage on changes
useModuleStore.subscribe((state) => {
  try {
    localStorage.setItem("unilife_modules", JSON.stringify(state.modules));
  } catch (e) {
    // ignore
  }
});
