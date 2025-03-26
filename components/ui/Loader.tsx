/**
 * Loader Component
 * 
 * A reusable loading spinner component that provides visual feedback during loading states.
 * Features include:
 * - Multiple size options
 * - Accessible loading indicator
 * - Smooth animation
 * - Customizable styling
 */

import React from "react";

/**
 * Props for the Loader component
 * @property {string} className - Additional CSS classes
 * @property {"large" | "medium" | "small"} size - Size variant of the loader
 */
interface LoaderProps {
  className?: string;
  size?: "large" | "medium" | "small";
}

/**
 * Size classes mapping for different loader sizes
 */
const sizeClasses = {
  large: "w-12 h-12",
  medium: "w-8 h-8",
  small: "w-4 h-4",
};

/**
 * Loader Component
 * 
 * Renders a spinning loading indicator with the following features:
 * - Three size variants (large, medium, small)
 * - Accessible loading status
 * - Smooth spinning animation
 * - Reduced motion support
 * - Customizable styling
 * 
 * @param {LoaderProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const Loader: React.FC<LoaderProps> = ({ className = "", size = "medium" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        {/* Accessible loading text */}
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
