/**
 * A reusable loading spinner component with multiple size options and accessible design.
 * Features: Smooth animation, customizable styling, reduced motion support.
 */

import { LoaderProps } from "@/types";
import React from "react";

/**
 * @param {string} className - Additional CSS classes
 * @param {"large" | "medium" | "small"} size - Size variant of the loader
 */

/**
 * Size mapping for loader variants
 */
const sizeClasses = {
  large: "w-12 h-12",
  medium: "w-8 h-8",
  small: "w-4 h-4",
};

/**
 * Renders a spinning loading indicator with customizable size and styling.
 * Includes accessibility features and reduced motion support.
 */
const Loader: React.FC<LoaderProps> = ({ className = "", size = "medium" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      >
        {/* Screen reader text for loading state */}
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
