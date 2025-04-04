/**
 * Type definitions for UI components and data structures.
 */

import { Earthquake } from "./Earthquake";

/**
 * Styling configuration for tooltip elements
 */
export type TooltipStyle = {
  backgroundColor: string;
  border: string;
  borderRadius: string;
};

/**
 * Data point structure for scatter plot visualization
 */
export interface DataPoint {
  [key: string]: any;
  x: number;
  y: number;
}

/**
 * Props for the limiter dropdown component
 */
export interface LimiterDropdownProps {
  limiter: number;
  setLimiter: (limiter: number) => void;
  totalCount: number;
}

/**
 * Props for the loader component
 */
export interface LoaderProps {
  className?: string;
  size?: "large" | "medium" | "small";
}

/**
 * Props for the scatter plot component
 */
export interface ScatterPlotProps {
  data: Earthquake[];
  margin?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  pointColor?: string;
  pointOpacity?: number;
  pointSize?: number;
  selectedRow: Earthquake | null;
  setSelectedRow: (row: Earthquake | null) => void;
  showGrid?: boolean;
  showTooltip?: boolean;
  title?: string;
  tooltipStyle?: TooltipStyle;
}

/**
 * Select option structure
 */
export interface Option {
  label: string;
  value: string;
}

/**
 * Props for the select component
 */
export interface SelectProps {
  isMulti?: boolean;
  onChange: (value: string | string[]) => void;
  options: Option[];
  value: string | string[];
}

/**
 * Column definition for table components
 * @template T - Data item type
 * @template K - Key type of data items
 */
export type Column<T, K extends keyof T> = {
  header: string;
  key: K;
  render?: (value: T[K], item: T) => React.ReactNode;
};

/**
 * Props for the table component
 * @template T - Data item type
 */
export interface TableProps<T> {
  className?: string;
  columns: Column<T, keyof T>[];
  data: T[];
  selectedRow: null | T;
  setSelectedRow: (row: T) => void;
}
  