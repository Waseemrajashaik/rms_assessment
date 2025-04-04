/**
 * A dropdown component for controlling the number of displayed items in a list or table.
 * Features: Dynamic option generation, responsive design, accessible controls.
 */

"use client";

import { LimiterDropdownProps } from "@/types";

/**
 * @param {number} limiter - Current limit value
 * @param {(limiter: number) => void} setLimiter - Limit change callback
 * @param {number} totalCount - Total available items
 */
export function LimiterDropdown({
  limiter,
  setLimiter,
  totalCount,
}: LimiterDropdownProps) {
  // Generate options based on total item count
  const options = generateLimiterOptions(totalCount);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600" htmlFor="limiter">
        Show:
      </label>
      <select
        className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        id="limiter"
        onChange={(e) => setLimiter(Number(e.target.value))}
        value={limiter}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Generates dropdown options with increasing values:
 * - Starts at 50, increments by 50 until 100
 * - Then increments by 100
 * - Always includes total count as last option
 */
function generateLimiterOptions(
  totalCount: number,
): { label: string; value: number; }[] {
  // Return single option for small counts
  if (totalCount <= 10)
    return [{ label: totalCount.toString(), value: totalCount }];

  const options = [];
  let option = 50;

  // Generate increasing value options
  while (option <= totalCount) {
    options.push({ label: option.toString(), value: option });
    if (option < 100) {
      option += 50;
    } else {
      option += 100;
    }
  }

  // Add total count option
  return [...options, { label: totalCount.toString(), value: totalCount }];
}
