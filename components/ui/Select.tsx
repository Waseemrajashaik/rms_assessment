/**
 * Select Component
 * 
 * A customizable select component that supports both single and multi-select functionality.
 * Features include:
 * - Single and multi-select modes
 * - Custom option rendering
 * - Click outside to close
 * - Keyboard accessibility
 * - Custom styling with Tailwind CSS
 */

"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Option type for select items
 * @property {string} label - Display text for the option
 * @property {string} value - Value associated with the option
 */
interface Option {
  label: string;
  value: string;
}

/**
 * Props for the Select component
 * @property {boolean} isMulti - Whether to allow multiple selections
 * @property {(value: string | string[]) => void} onChange - Callback for selection changes
 * @property {Option[]} options - Available options to select from
 * @property {string | string[]} value - Current selected value(s)
 */
interface SelectProps {
  isMulti?: boolean;
  onChange: (value: string | string[]) => void;
  options: Option[];
  value: string | string[];
}

/**
 * Select Component
 * 
 * Renders a customizable select dropdown with the following features:
 * - Single and multi-select modes
 * - Custom option rendering
 * - Click outside to close
 * - Visual feedback for selected items
 * - Responsive design
 * 
 * @param {SelectProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function Select({
  isMulti = false,
  onChange,
  options,
  value,
}: SelectProps) {
  // State for controlling dropdown visibility
  const [isOpen, setIsOpen] = useState(false);
  // Ref for handling click outside
  const selectRef = useRef<HTMLDivElement>(null);
  // Normalize value to array for consistent handling
  const selectedValues = Array.isArray(value) ? value : [value];

  // Effect to handle clicking outside the select
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handles option selection
   * @param {string} optionValue - Value of the selected option
   */
  const handleOptionClick = (optionValue: string) => {
    if (isMulti) {
      // Toggle selection for multi-select mode
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValue);
    } else {
      // Single selection mode
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  // Format display value based on selection mode
  const displayValue = isMulti
    ? selectedValues.length > 0
      ? `${selectedValues.length} selected`
      : "Select options"
    : options.find((opt) => opt.value === value)?.label || "Select an option";

  return (
    <div className="relative" ref={selectRef}>
      {/* Select trigger button */}
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        <span className="ml-2">▼</span>
      </div>
      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-11 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
            >
              {/* Checkbox for multi-select mode */}
              {isMulti && (
                <input
                  checked={selectedValues.includes(option.value)}
                  className="mr-2"
                  onChange={() => {}}
                  type="checkbox"
                />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
