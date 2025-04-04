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

export class EarthquakeValidationError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION", details);
    this.name = "EarthquakeValidationError";
  }
}

export class EarthquakeFetchError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "API", details);
    this.name = "EarthquakeFetchError";
  }
}

export class EarthquakeParamError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "VALIDATION", details);
    this.name = "EarthquakeParamError";
  }
}

export class EarthquakeNetworkError extends EarthquakeError {
  constructor(message: string, details?: unknown) {
    super(message, "NETWORK", details);
    this.name = "EarthquakeNetworkError";
  }
}
