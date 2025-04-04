/**
 * A multi-select component for choosing earthquake data table columns.
 * Features: Minimum 3 columns required, predefined options.
 */

"use client";

import { Select } from "@/components/ui/Select";
import { ColumnSelectorProps } from "@/types";
import { columnOptions } from "@/utils";

/**
 * Renders a multi-select dropdown for table column selection.
 * Enforces minimum 3 columns selection.
 */
export function ColumnSelector({
  onColumnChange,
  selectedColumns,
}: ColumnSelectorProps) {
  /**
   * Handles column selection changes and enforces minimum selection.
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
