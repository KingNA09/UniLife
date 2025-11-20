import { create } from "zustand";

export const useFinanceStore = create((set) => ({
  financeData: [
    { id: 1, category: "Food", amount: 120, date: "2025-01-05" },
    { id: 2, category: "Travel", amount: 45, date: "2025-01-08" },
    { id: 3, category: "Books", amount: 80, date: "2025-01-12" },
    { id: 4, category: "Gym", amount: 30, date: "2025-01-15" },
  ],

  addRecord: (record) =>
    set((state) => ({
      financeData: [...state.financeData, { id: Date.now(), ...record }],
    })),
    updateRecord: (id, updatedRecord) =>
  set((state) => ({
    financeData: state.financeData.map((item) =>
      item.id === id ? { ...item, ...updatedRecord } : item
    ),
  })),
  deleteRecord: (id) =>
  set((state) => ({
    financeData: state.financeData.filter((item) => item.id !== id),
  })),
}));
