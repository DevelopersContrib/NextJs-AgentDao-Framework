import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: {
    logo: null,
    primaryColor: "#000000",
    secondaryColor: "#ffffff"
  },
  loading: false,
  error: null,
  setTheme: (theme) => set({ theme }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
