import { create } from "zustand";

// hydrate assignments from localStorage
const stored = (() => {
  try {
    const raw = localStorage.getItem("unilife_assignments");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
})();

export const useAssignmentStore = create((set) => ({
  assignments: stored ?? [],

  addAssignment: (assignment) =>
    set((state) => ({ assignments: [...state.assignments, { id: Date.now(), ...assignment }] })),

  updateAssignment: (id, updated) =>
    set((state) => ({ assignments: state.assignments.map((a) => (a.id === id ? { ...a, ...updated } : a)) })),

  deleteAssignment: (id) =>
    set((state) => ({ assignments: state.assignments.filter((a) => a.id !== id) })),
}));

// persist
useAssignmentStore.subscribe((state) => {
  try {
    localStorage.setItem("unilife_assignments", JSON.stringify(state.assignments));
  } catch (e) {
    // ignore
  }
});
