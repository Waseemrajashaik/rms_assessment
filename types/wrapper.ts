import { EarthquakeError } from "./EarthquakeErrors";

export type SectionWrapperProps = {
  children: React.ReactNode;
  error: EarthquakeError | null;
  isLoading: boolean;
};
