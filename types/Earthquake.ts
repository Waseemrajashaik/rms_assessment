/**
 * Type definitions for earthquake data.
 */

/**
 * Interface representing earthquake event data
 */
export interface Earthquake {
  id: string;
  time: string;
  latitude: number;
  longitude: number;
  depth: number;
  magnitude: number;
  place: string;
  type: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  alert: string;
  horizontalError: number;
  depthError: number;
  magError: number;
  magNst: number;
  updated: string;
  locationSource: string;
  magSource: string;
}
