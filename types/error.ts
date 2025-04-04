/**
 * Type definitions for error handling components.
 */

/**
 * Props for error display component
 */
export interface ErrorProps {
    className?: string;
    message: string;
    onRetry?: () => void;
  }
  