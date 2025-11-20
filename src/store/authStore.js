import { create } from "zustand";

// Initialize from localStorage if available
const stored = (() => {
  try {
    const raw = localStorage.getItem("unilife_auth");
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
})();

export const useAuthStore = create((set) => ({
  isLoggedIn: stored?.isLoggedIn ?? false,
  user: stored?.user ?? null,

  login: (username) =>
    set((state) => {
      const next = { ...state, isLoggedIn: true, user: { name: username } };
      return next;
    }),

  logout: () =>
    set((state) => {
      const next = { ...state, isLoggedIn: false, user: null };
      return next;
    }),
}));

// Persist auth changes to localStorage
useAuthStore.subscribe((state) => {
  try {
    localStorage.setItem(
      "unilife_auth",
      JSON.stringify({ isLoggedIn: state.isLoggedIn, user: state.user })
    );
  } catch (e) {
    // ignore
  }
});
