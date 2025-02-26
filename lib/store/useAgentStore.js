import { create } from "zustand";

export const useAgentStore = create((set) => ({
  agents: {},
  loading: false,
  error: null,
  setAgents: (agents) => set({ agents }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
