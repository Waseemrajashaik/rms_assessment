import { TooltipStyle } from "@/utils";
import { Earthquake } from "./Earthquake";

export interface LimiterDropdownProps {
    limiter: number;
    setLimiter: (limiter: number) => void;
    totalCount: number;
  }
  
  export interface LoaderProps {
    className?: string;
    size?: "large" | "medium" | "small";
  }  

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
 * Option type for select items
 * @property {string} label - Display text for the option
 * @property {string} value - Value associated with the option
 */
export interface Option {
    label: string;
    value: string;
  }
  
  /**
   * Props for the Select component
   * @property {boolean} isMulti - Whether to allow multiple selections
   * @property {(value: string | string[]) => void} onChange - Callback for selection changes
   * @property {Option[]} options - Available options to select from
   * @property {string | string[]} value - Current selected value(s)
   */
  export interface SelectProps {
    isMulti?: boolean;
    onChange: (value: string | string[]) => void;
    options: Option[];
    value: string | string[];
  }


  /**
 * Column definition type for the table
 * @template T - The type of the data items
 * @template K - The key type of the data items
 * @property {string} header - Display header for the column
 * @property {K} key - Key to access the data in each row
 * @property {(value: T[K], item: T) => React.ReactNode} render - Optional custom render function
 */
export type Column<T, K extends keyof T> = {
    header: string;
    key: K;
    render?: (value: T[K], item: T) => React.ReactNode;
  };
  
  /**
   * Props for the Table component
   * @template T - The type of the data items
   * @property {string} className - Additional CSS classes
   * @property {Column<T, keyof T>[]} columns - Column definitions
   * @property {T[]} data - Array of data items to display
   * @property {T | null} selectedRow - Currently selected row
   * @property {(row: T) => void} setSelectedRow - Callback for row selection
   */
  export interface TableProps<T> {
    className?: string;
    columns: Column<T, keyof T>[];
    data: T[];
    selectedRow: null | T;
    setSelectedRow: (row: T) => void;
  }
  