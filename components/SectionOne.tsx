/**
 * SectionOne Component
 * 
 * This component renders the first section of the dashboard containing the scatter plot visualization.
 * It handles the display of earthquake data in a scatter plot format with interactive features.
 */

"use client";
import { useContextProvider } from "@/providers/ContextProvider";
import { useEarthquakeStore } from "@/store/useEarthquakeStore";
import { EarthquakeError } from "@/types";

import { ScatterPlot } from "./ui/ScatterPlot";
import { SectionWrapper } from "./wrapper/SectionWrapper";

/**
 * Props for the SectionOne component
 * @property {EarthquakeError | null} error - Error state for earthquake data loading
 * @property {boolean} isLoading - Loading state indicator
 */
type SectionOneProps = {
  error: EarthquakeError | null;
  isLoading: boolean;
};

/**
 * SectionOne Component
 * 
 * Renders a scatter plot visualization of earthquake data with interactive features.
 * The plot allows users to select individual data points and view detailed information.
 * 
 * @param {SectionOneProps} props - Component props containing error and loading states
 * @returns {JSX.Element} Rendered component
 */
export function SectionOne({ error, isLoading }: SectionOneProps) {
  // Get selected row state and setter from context
  const { selectedRow, setSelectedRow } = useContextProvider();
  // Get filtered earthquake data from global store
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
