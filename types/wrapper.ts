/**
 * Type definitions for wrapper components.
 */

import { EarthquakeError } from "./EarthquakeErrors";

/**
 * Props for section wrapper component
 */
export type SectionWrapperProps = {
  children: React.ReactNode;
  error: EarthquakeError | null;
  isLoading: boolean;
};
