import { Earthquake } from "@/types";
import { ReactNode } from "react";

export const allColumns = [
  {
    key: "time" as keyof Earthquake,
    header: "Time",
    render: (value: string | number, item: Earthquake): ReactNode => {
      return new Date(String(value)).toLocaleString();
    },
  },
  {
    key: "magnitude" as keyof Earthquake,
    header: "Magnitude",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(2);
    },
  },
  {
    key: "place" as keyof Earthquake,
    header: "Location",
  },
  {
    key: "depth" as keyof Earthquake,
    header: "Depth (km)",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(1);
    },
  },
  {
    key: "latitude" as keyof Earthquake,
    header: "Latitude",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(4);
    },
  },
  {
    key: "longitude" as keyof Earthquake,
    header: "Longitude",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(4);
    },
  },
  {
    key: "type" as keyof Earthquake,
    header: "Type",
  },
  {
    key: "status" as keyof Earthquake,
    header: "Status",
  },
  {
    key: "tsunami" as keyof Earthquake,
    header: "Tsunami",
    render: (value: string | number, item: Earthquake): ReactNode => {
      return Number(value) ? "Yes" : "No";
    },
  },
  {
    key: "sig" as keyof Earthquake,
    header: "Significance",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toLocaleString();
    },
  },
  {
    key: "net" as keyof Earthquake,
    header: "Network",
  },
  {
    key: "code" as keyof Earthquake,
    header: "Code",
  },
  {
    key: "nst" as keyof Earthquake,
    header: "Stations",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toLocaleString();
    },
  },
  {
    key: "dmin" as keyof Earthquake,
    header: "Distance (km)",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(2);
    },
  },
  {
    key: "rms" as keyof Earthquake,
    header: "RMS",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(2);
    },
  },
  {
    key: "gap" as keyof Earthquake,
    header: "Gap (°)",
    render: (value: string | number, item: Earthquake): ReactNode => {
      const numValue = Number(value);
      if (isNaN(numValue)) return "N/A";
      return numValue.toFixed(1);
    },
  },
  {
    key: "magType" as keyof Earthquake,
    header: "Magnitude Type",
  },
  {
    key: "alert" as keyof Earthquake,
    header: "Alert",
  },
  {
    key: "updated" as keyof Earthquake,
    header: "Updated",
    render: (value: string | number, item: Earthquake): ReactNode => {
      return new Date(String(value)).toLocaleString();
    },
  },
];
