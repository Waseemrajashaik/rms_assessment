/**
 * SectionTwo Component
 * 
 * This component renders the second section of the dashboard containing the data table.
 * It provides a sortable and filterable table view of earthquake data with column selection.
 */

"use client";

import { Table } from "@/components/ui/Table";
import { allColumns } from "@/constants";
import { useContextProvider } from "@/providers/ContextProvider";
import { useEarthquakeStore } from "@/store/useEarthquakeStore";
import { EarthquakeError } from "@/types";
import { useState } from "react";

import { ColumnSelector } from "./ColumnSelector";
import { SectionWrapper } from "./wrapper/SectionWrapper";

/**
 * Props for the SectionTwo component
 * @property {EarthquakeError | null} error - Error state for earthquake data loading
 * @property {boolean} isLoading - Loading state indicator
 */
type SectionTwoProps = {
  error: EarthquakeError | null;
  isLoading: boolean;
};

/**
 * SectionTwo Component
 * 
 * Renders a data table displaying earthquake information with the following features:
 * - Column selection for customizing visible data
 * - Row selection for highlighting data points
 * - Scrollable table with fixed header
 * - Responsive layout with proper overflow handling
 * 
 * @param {SectionTwoProps} props - Component props containing error and loading states
 * @returns {JSX.Element} Rendered component
 */
export function SectionTwo({ error, isLoading }: SectionTwoProps) {
  // Get selected row state and setter from context
  const { selectedRow, setSelectedRow } = useContextProvider();
  // Get filtered earthquake data from global store
  const { filteredEarthquakes: earthquakes } = useEarthquakeStore();
  // State for managing selected columns in the table
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "time",
    "magnitude",
    "place",
  ]);

  // Filter columns based on user selection
  const filteredColumns = allColumns.filter((column) =>
    selectedColumns.includes(String(column.key)),
  );

  return (
    <SectionWrapper error={error} isLoading={isLoading}>
      <section className="bg-white rounded-lg shadow-sm p-4 h-full flex flex-col overflow-hidden">
        {/* Header section with title and column selector */}
        <div className="flex flex-row justify-between items-start">
          <h2 className="text-base font-semibold text-gray-800 mb-2">
            Recent Earthquakes
          </h2>
          <div className="flex items-center gap-4">
            <ColumnSelector
              onColumnChange={(columns) => setSelectedColumns(columns)}
              selectedColumns={selectedColumns}
            />
          </div>
        </div>
        {/* Table container with scroll handling */}
        <div className="flex-1 overflow-hidden min-h-0 max-h-[calc(100vh-12rem)]">
          {earthquakes && earthquakes.length > 0 ? (
            <div className="h-full overflow-auto">
              <Table
                className="bg-white text-sm"
                columns={filteredColumns}
                data={earthquakes}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              No earthquakes found
            </div>
          )}
        </div>
      </section>
    </SectionWrapper>
  );
}
