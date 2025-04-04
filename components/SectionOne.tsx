/**
 * Dashboard section displaying earthquake data in an interactive scatter plot.
 * Features: Point selection, data filtering, responsive visualization.
 */

"use client";
import { useContextProvider } from "@/providers/ContextProvider";
import { useEarthquakeStore } from "@/store/useEarthquakeStore";

import { ScatterPlot } from "./ui/ScatterPlot";
import { SectionWrapper } from "./wrapper/SectionWrapper";
import { SectionProps } from "@/types";

/**
 * Renders a scatter plot visualization with interactive data point selection.
 */
export function SectionOne({ error, isLoading }: SectionProps) {
  // Selected row state from context
  const { selectedRow, setSelectedRow } = useContextProvider();
  // Filtered earthquake data from store
  const { filteredEarthquakes: earthquakes } = useEarthquakeStore();

  return (
    <SectionWrapper error={error} isLoading={isLoading}>
      <section className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
        <ScatterPlot
          data={earthquakes || []}
          pointColor="#8884d8"
          pointOpacity={0.6}
          pointSize={8}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          title="Earthquake Analysis"
        />
      </section>
    </SectionWrapper>
  );
}
