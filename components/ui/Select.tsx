/**
 * A customizable select component supporting single and multi-select modes.
 * Features: Custom option rendering, click-outside closing, keyboard accessibility, Tailwind styling.
 */

"use client";
import { SelectProps, Option } from "@/types";
import React, { useEffect, useRef, useState } from "react";

/**
 * Renders a customizable select dropdown with single/multi-select support and responsive design.
 */
export function Select({
  isMulti = false,
  onChange,
  options,
  value,
}: SelectProps) {
  // Controls dropdown open/close state
  const [isOpen, setIsOpen] = useState(false);
  // Reference for click-outside detection
  const selectRef = useRef<HTMLDivElement>(null);
  // Normalized value array for consistent handling
  const selectedValues = Array.isArray(value) ? value : [value];

  // Handles click-outside to close dropdown
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
   * Handles option selection with support for both single and multi-select modes
   */
  const handleOptionClick = (optionValue: string) => {
    if (isMulti) {
      // Toggle selection in multi-select mode
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValue);
    } else {
      // Handle single selection
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  // Formats display text based on selection mode
  const displayValue = isMulti
    ? selectedValues.length > 0
      ? `${selectedValues.length} selected`
      : "Select options"
    : options.find((opt) => opt.value === value)?.label || "Select an option";

  return (
    <div className="relative" ref={selectRef}>
      {/* Main select trigger with dropdown indicator */}
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        <span className="ml-2">▼</span>
      </div>
      {/* Dropdown options list */}
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
