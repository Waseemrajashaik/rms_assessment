import { Earthquake } from "../Earthquake";
import { EarthquakeError } from "../EarthquakeErrors";

export interface EarthquakeState {
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
  