import { request } from "@/utils/axios";
import { Earthquake } from "@/types/Earthquake";
import { EarthquakeError } from "@/types/errors";

export const fetchEarthquakes = async (): Promise<Earthquake[]> => {
  const response = await request.get("/earthquakes");

  if (!Array.isArray(response.data)) {
    throw new EarthquakeError(
      "Invalid response format",
      "VALIDATION",
      response.data,
    );
  }

  return response.data;
};
