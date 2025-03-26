"use client";

import { useQuery } from "@tanstack/react-query";
import { useEarthquakeStore } from "@/store/useEarthquakeStore";
import { fetchEarthquakes } from "@/utils/api/earthquakes";
import { Earthquake, EarthquakeError } from "@/types";
import { useEffect } from "react";

export function useEarthquakes() {
  const { setEarthquakes, setLoading, setError, clearError, setLimiter } =
    useEarthquakeStore();

  const query = useQuery<Earthquake[], EarthquakeError>({
    queryKey: ["earthquakes"],
    queryFn: fetchEarthquakes,
    retry: (failureCount, error) => {
      if (error.type === "VALIDATION") return false;
      if (error.type === "NETWORK") return failureCount < 3;
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  useEffect(() => {
    if (query.data) {
      setEarthquakes(query.data);
      setLimiter(query.data.length);
      setLoading(false);
      clearError();
    }
  }, [query.data, setEarthquakes, setLoading, clearError]);

  useEffect(() => {
    if (query.error) {
      setError(query.error);
      setLoading(false);
    }
  }, [query.error, setError, setLoading]);

  useEffect(() => {
    if (query.isLoading) {
      setLoading(true);
      clearError();
    }
  }, [query.isLoading, setLoading, clearError]);

  return query;
}
