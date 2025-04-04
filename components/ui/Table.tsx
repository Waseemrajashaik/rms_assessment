/**
 * A generic table component with custom columns, row selection, and automatic scrolling.
 * Features: Sticky header, responsive design, customizable rendering.
 */

import { TableProps } from "@/types";
import { useEffect, useRef } from "react";

/**
 * Renders a data table with customizable columns, row selection, and automatic scrolling.
 * @template T - Type of data items
 */
export function Table<T>({
  className = "",
  columns,
  data,
  selectedRow,
  setSelectedRow,
}: TableProps<T>) {
  // Reference to the currently selected row
  const selectedRowRef = useRef<HTMLTableRowElement>(null);

  // Automatically scrolls to selected row
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
        {/* Sticky header with column titles */}
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
        {/* Scrollable table body with selectable rows */}
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
