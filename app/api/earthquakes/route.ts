import { Earthquake } from "@/types";
import csv from "csvtojson";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
export const dynamic = 'force-static';

const DATA_PATH = path.join(
  process.cwd(),
  "public/earthquakes/processed_all_month.csv",
);

let cachedData: Earthquake[] | null = null;

export async function GET() {
  try {
    const data = await fetchData();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching earthquake data" },
      { status: 500 },
    );
  }
}

async function fetchData(): Promise<Earthquake[]> {
  if (cachedData === null) {
    const csvData = await fs.readFile(DATA_PATH, "utf-8");
    const data: Earthquake[] = await csv().fromString(csvData);
    cachedData = data;
  }
  return cachedData;
}
