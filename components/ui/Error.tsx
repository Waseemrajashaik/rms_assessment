/**
 * A reusable error display component with warning icon, error message, and optional retry button.
 * Features: Custom error message, retry functionality, accessible design, responsive layout.
 */

import { ErrorProps } from "@/types";
import React from "react";

/**
 * @param {string} className - Additional CSS classes
 * @param {string} message - Error message to display
 * @param {() => void} onRetry - Optional retry callback
 */
const Error: React.FC<ErrorProps> = ({ className = "", message, onRetry }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 text-center ${className}`}
    >
      {/* Warning icon for error indication */}
      <div className="mb-4 text-red-500">
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </div>
      {/* Main error message display */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Error</h3>
      <p className="mb-4 text-sm text-gray-600">{message}</p>
      {/* Retry action button */}
      {onRetry && (
        <button
          className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;
