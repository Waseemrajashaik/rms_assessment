import { EarthquakeError } from "./EarthquakeErrors";

/**
 * Props for the ColumnSelector component
 * @property {(columns: string[]) => void} onColumnChange - Callback function when columns are selected
 * @property {string[]} selectedColumns - Currently selected column values
 */
export interface ColumnSelectorProps {
    onColumnChange: (columns: string[]) => void;
    selectedColumns: string[];
  }

  /**
 * Props for the SectionOne component
 * @property {EarthquakeError | null} error - Error state for earthquake data loading
 * @property {boolean} isLoading - Loading state indicator
 */
export type SectionProps = {
    error: EarthquakeError | null;
    isLoading: boolean;
  };
  