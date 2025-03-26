import { create } from "zustand";
import { Earthquake, EarthquakeError } from "@/types";

interface EarthquakeState {
  earthquakes: Earthquake[];
  filteredEarthquakes: Earthquake[];
  isLoading: boolean;
  error: EarthquakeError | null;
  setEarthquakes: (earthquakes: Earthquake[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: EarthquakeError | null) => void;
  clearError: () => void;
  setLimiter: (limiter: number) => void;
  limiter: number;
}

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
