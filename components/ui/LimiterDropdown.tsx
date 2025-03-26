/**
 * LimiterDropdown Component
 * 
 * A dropdown component for controlling the number of items displayed in a list or table.
 * Dynamically generates options based on the total count of items.
 */

"use client";

/**
 * Props for the LimiterDropdown component
 * @property {number} limiter - Current limit value
 * @property {(limiter: number) => void} setLimiter - Callback for limit changes
 * @property {number} totalCount - Total number of items available
 */
interface LimiterDropdownProps {
  limiter: number;
  setLimiter: (limiter: number) => void;
  totalCount: number;
}

/**
 * LimiterDropdown Component
 * 
 * Renders a dropdown for controlling the number of displayed items with:
 * - Dynamic option generation based on total count
 * - Responsive design
 * - Accessible form controls
 * 
 * @param {LimiterDropdownProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function LimiterDropdown({
  limiter,
  setLimiter,
  totalCount,
}: LimiterDropdownProps) {
  // Generate options based on total count
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
 * Generates options for the limiter dropdown
 * Creates a series of options with increasing values:
 * - Starts with 50
 * - Increments by 50 until 100
 * - Then increments by 100
 * - Always includes the total count as the last option
 * 
 * @param {number} totalCount - Total number of items available
 * @returns {Array<{label: string, value: number}>} Array of option objects
 */
function generateLimiterOptions(
  totalCount: number,
): { label: string; value: number; }[] {
  // If total count is small, just return a single option
  if (totalCount <= 10)
    return [{ label: totalCount.toString(), value: totalCount }];

  const options = [];
  let option = 50;

  // Generate options with increasing values
  while (option <= totalCount) {
    options.push({ label: option.toString(), value: option });
    if (option < 100) {
      option += 50;
    } else {
      option += 100;
    }
  }

  // Add total count as the last option
  return [...options, { label: totalCount.toString(), value: totalCount }];
}
