import { create } from "zustand";

export const useReferralStore = create((set) => ({
  campaignId: 0,
  loading: false,
  error: null,
  setCampaignId: (campaignId) => set({ campaignId }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
