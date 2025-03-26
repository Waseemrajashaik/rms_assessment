/**
 * Table Component
 * 
 * A generic, reusable table component that supports:
 * - Custom column definitions with render functions
 * - Row selection with highlighting
 * - Automatic scrolling to selected row
 * - Responsive design with sticky header
 */

import { useEffect, useRef } from "react";

/**
 * Column definition type for the table
 * @template T - The type of the data items
 * @template K - The key type of the data items
 * @property {string} header - Display header for the column
 * @property {K} key - Key to access the data in each row
 * @property {(value: T[K], item: T) => React.ReactNode} render - Optional custom render function
 */
type Column<T, K extends keyof T> = {
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
interface TableProps<T> {
  className?: string;
  columns: Column<T, keyof T>[];
  data: T[];
  selectedRow: null | T;
  setSelectedRow: (row: T) => void;
}

/**
 * Table Component
 * 
 * Renders a data table with the following features:
 * - Customizable columns with optional render functions
 * - Row selection with visual highlighting
 * - Automatic scrolling to selected row
 * - Sticky header for better UX
 * - Responsive design
 * 
 * @template T - The type of the data items
 * @param {TableProps<T>} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function Table<T>({
  className = "",
  columns,
  data,
  selectedRow,
  setSelectedRow,
}: TableProps<T>) {
  // Ref for the selected row element
  const selectedRowRef = useRef<HTMLTableRowElement>(null);

  // Effect to scroll selected row into view
  useEffect(() => {
    if (selectedRow && selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedRow]);

  return (
    <div className="relative">
      <table className={`w-full border-collapse ${className}`}>
        {/* Table header with sticky positioning */}
        <thead>
          <tr className="bg-gray-50 sticky top-0 shadow-sm z-10">
            {columns.map((column) => (
              <th
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                key={String(column.key)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body with row selection */}
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              className={`transition-colors duration-150 ease-in-out cursor-pointer ${selectedRow === item ? "bg-amber-400" : ""}`}
              key={index}
              onClick={() => setSelectedRow(item)}
              ref={selectedRow === item ? selectedRowRef : null}
            >
              {columns.map((column) => (
                <td
                  className="px-3 py-2 text-xs text-gray-900 whitespace-nowrap"
                  key={String(column.key)}
                >
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
