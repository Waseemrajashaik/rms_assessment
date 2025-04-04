/**
 * Type definitions for main application components.
 */

import { EarthquakeError } from "./EarthquakeErrors";

/**
 * Props for column selector component
 */
export interface ColumnSelectorProps {
  onColumnChange: (columns: string[]) => void;
  selectedColumns: string[];
}

/**
 * Common props for section components
 */
export type SectionProps = {
  error: EarthquakeError | null;
  isLoading: boolean;
};
  