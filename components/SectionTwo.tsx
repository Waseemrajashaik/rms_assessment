/**
 * Dashboard section displaying earthquake data in a sortable and filterable table.
 * Features: Column selection, row highlighting, fixed header, responsive layout.
 */

"use client";

import { Table } from "@/components/ui/Table";
import { allColumns } from "@/constants";
import { useContextProvider } from "@/providers/ContextProvider";
import { useEarthquakeStore } from "@/store/useEarthquakeStore";
import { SectionProps } from "@/types";
import { useState } from "react";

import { ColumnSelector } from "./ColumnSelector";
import { SectionWrapper } from "./wrapper/SectionWrapper";

/**
 * Renders a data table with customizable columns and interactive row selection.
 */
export function SectionTwo({ error, isLoading }: SectionProps) {
  // Selected row state from context
  const { selectedRow, setSelectedRow } = useContextProvider();
  // Filtered earthquake data from store
  const { filteredEarthquakes: earthquakes } = useEarthquakeStore();
  // Currently selected table columns
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    "time",
    "magnitude",
    "place",
  ]);

  // Filter visible columns based on selection
  const filteredColumns = allColumns.filter((column) =>
    selectedColumns.includes(String(column.key)),
  );

  return (
    <SectionWrapper error={error} isLoading={isLoading}>
      <section className="bg-white rounded-lg shadow-sm p-4 h-full flex flex-col overflow-hidden">
        {/* Section header with title and column controls */}
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
        {/* Scrollable table container */}
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
