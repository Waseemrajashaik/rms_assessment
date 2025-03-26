/**
 * MenuBar Component
 * 
 * The top navigation bar of the application that displays the title and data limiting controls.
 * Provides a clean interface for controlling the number of earthquake records displayed.
 */

"use client";
import { useEarthquakeStore } from "@/store/useEarthquakeStore";

import { LimiterDropdown } from "./ui/LimiterDropdown";

/**
 * MenuBar Component
 * 
 * Renders the application's top navigation bar with:
 * - Application title
 * - Data limiting controls for controlling the number of displayed records
 * 
 * @returns {JSX.Element} Rendered component
 */
export function MenuBar() {
  // Get earthquake data and limiter controls from global store
  const { earthquakes, limiter, setLimiter } = useEarthquakeStore();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Application title */}
          <h1 className="text-lg font-semibold text-gray-800">
            Front end Assignment
          </h1>
          {/* Controls section */}
          <div className="flex flex-row gap-4 justify-center items-center">
            <LimiterDropdown
              limiter={limiter}
              setLimiter={setLimiter}
              totalCount={earthquakes.length}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
