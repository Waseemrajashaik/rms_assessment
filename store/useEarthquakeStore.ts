import { create } from "zustand";
import { EarthquakeState } from "@/types";


export const useEarthquakeStore = create<EarthquakeState>((set, get) => ({
  earthquakes: [],
  filteredEarthquakes: [],
  isLoading: false,
  error: null,
  limiter: 100,
  setEarthquakes: (earthquakes) => set({ earthquakes }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setLimiter: (limiter) =>
    set({ limiter, filteredEarthquakes: get().earthquakes.slice(0, limiter) }),
}));
