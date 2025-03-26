"use client";

import { EarthquakeError } from "@/types";

import Error from "../ui/Error";
import Loader from "../ui/Loader";

type SectionWrapperProps = {
  children: React.ReactNode;
  error: EarthquakeError | null;
  isLoading: boolean;
};

export function SectionWrapper({
  children,
  error,
  isLoading,
}: SectionWrapperProps) {
  if (isLoading) return <Loader />;
  if (error)
    return (
      <Error message={error?.message || "Error loading earthquake data"} />
    );

  return <>{children}</>;
}
