/**
 * Custom error classes for earthquake data handling.
 */

/**
 * Base error class for earthquake-related errors
 */
export class EarthquakeError extends Error {
  constructor(
    message: string,
    public type: "API" | "VALIDATION" | "NETWORK",
    public details?: unknown,
  ) {
    super(message);
    this.name = "EarthquakeError";
  }
}

/**
 * Error for data validation failures
 */
export class EarthquakeValidationError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION", details);
    this.name = "EarthquakeValidationError";
  }
}

/**
 * Error for API fetch failures
 */
export class EarthquakeFetchError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "API", details);
    this.name = "EarthquakeFetchError";
  }
}

/**
 * Error for invalid parameter values
 */
export class EarthquakeParamError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION", details);
    this.name = "EarthquakeParamError";
  }
}

/**
 * Error for network-related failures
 */
export class EarthquakeNetworkError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "NETWORK", details);
    this.name = "EarthquakeNetworkError";
  }
}
