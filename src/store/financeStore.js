import { create } from "zustand";

const STORAGE_KEY = "unilife_finance";

const defaultData = [];

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // ignore and fallback
  }
  return defaultData;
}

export const useFinanceStore = create((set, get) => ({
  financeData: loadInitial(),

  addRecord: (record) =>
    set((state) => {
      const next = [...state.financeData, { id: Date.now(), ...record }];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return { financeData: next };
    }),

  updateRecord: (id, updatedRecord) =>
    set((state) => {
      const next = state.financeData.map((item) =>
        item.id === id ? { ...item, ...updatedRecord } : item
      );
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return { financeData: next };
    }),

  deleteRecord: (id) =>
    set((state) => {
      const next = state.financeData.filter((item) => item.id !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return { financeData: next };
    }),
  resetToDefaults: () =>
    set(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData)); } catch (e) {}
      return { financeData: defaultData };
    }),
}));
