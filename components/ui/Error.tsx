/**
 * Error Component
 * 
 * A reusable error display component that shows error messages with optional retry functionality.
 * Features include:
 * - Custom error message display
 * - Optional retry button
 * - Accessible error icon
 * - Responsive design
 */

import React from "react";

/**
 * Props for the Error component
 * @property {string} className - Additional CSS classes
 * @property {string} message - Error message to display
 * @property {() => void} onRetry - Optional callback for retry action
 */
interface ErrorProps {
  className?: string;
  message: string;
  onRetry?: () => void;
}

/**
 * Error Component
 * 
 * Renders an error message display with the following features:
 * - Warning icon
 * - Error message text
 * - Optional retry button
 * - Responsive layout
 * - Accessible design
 * 
 * @param {ErrorProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const Error: React.FC<ErrorProps> = ({ className = "", message, onRetry }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 text-center ${className}`}
    >
      {/* Warning icon */}
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
      {/* Error message */}
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Error</h3>
      <p className="mb-4 text-sm text-gray-600">{message}</p>
      {/* Retry button (if callback provided) */}
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
