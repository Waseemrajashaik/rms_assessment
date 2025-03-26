/**
 * ColumnSelector Component
 * 
 * A component that allows users to select which columns to display in the earthquake data table.
 * Provides a multi-select dropdown with predefined column options and enforces a minimum selection.
 */

"use client";

import { Select } from "@/components/ui/Select";

/**
 * Props for the ColumnSelector component
 * @property {(columns: string[]) => void} onColumnChange - Callback function when columns are selected
 * @property {string[]} selectedColumns - Currently selected column values
 */
interface ColumnSelectorProps {
  onColumnChange: (columns: string[]) => void;
  selectedColumns: string[];
}

/**
 * ColumnSelector Component
 * 
 * Renders a multi-select dropdown for choosing which columns to display in the data table.
 * Enforces a minimum of 3 columns to be selected at all times.
 * 
 * @param {ColumnSelectorProps} props - Component props containing callback and selected columns
 * @returns {JSX.Element} Rendered component
 */
export function ColumnSelector({
  onColumnChange,
  selectedColumns,
}: ColumnSelectorProps) {
  // Define available column options with their display labels and values
  const columnOptions = [
    { label: "Time", value: "time" },
    { label: "Magnitude", value: "magnitude" },
    { label: "Location", value: "place" },
    { label: "Depth (km)", value: "depth" },
    { label: "Latitude", value: "latitude" },
    { label: "Longitude", value: "longitude" },
    { label: "Type", value: "type" },
    { label: "Status", value: "status" },
    { label: "Tsunami", value: "tsunami" },
    { label: "Significance", value: "sig" },
    { label: "Network", value: "net" },
    { label: "Code", value: "code" },
    { label: "Stations", value: "nst" },
    { label: "Distance (km)", value: "dmin" },
    { label: "RMS", value: "rms" },
    { label: "Gap (°)", value: "gap" },
    { label: "Magnitude Type", value: "magType" },
    { label: "Alert", value: "alert" },
    { label: "Updated", value: "updated" },
  ];

  /**
   * Handles changes in column selection
   * Ensures at least 3 columns are selected
   * @param {string | string[]} value - Selected column value(s)
   */
  const handleChange = (value: string | string[]) => {
    const newColumns = Array.isArray(value) ? value : [value];

    if (newColumns.length < 3) {
      alert("Please select at least 3 columns");
      return;
    }

    onColumnChange(newColumns);
  };

  return (
    <div className="mb-4">
      <Select
        isMulti
        onChange={handleChange}
        options={columnOptions}
        value={selectedColumns}
      />
    </div>
  );
}
