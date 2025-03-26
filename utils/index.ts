import { debounce } from "lodash";
import { Earthquake } from "@/types";
import * as d3 from "d3";

export const defaultMargin = {
  bottom: 40,
  left: 50,
  right: 30,
  top: 20,
} as const;

export const defaultTooltipStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid #ccc",
  borderRadius: "4px",
} as const;

export type TooltipStyle = {
  backgroundColor: string;
  border: string;
  borderRadius: string;
};

export const numericFields = [
  { label: "Magnitude", value: "magnitude" },
  { label: "Depth", value: "depth" },
  { label: "Latitude", value: "latitude" },
  { label: "Longitude", value: "longitude" },
  { label: "Significance", value: "sig" },
  { label: "Distance", value: "dmin" },
  { label: "RMS", value: "rms" },
  { label: "Gap", value: "gap" },
  { label: "Horizontal Error", value: "horizontalError" },
  { label: "Depth Error", value: "depthError" },
  { label: "Magnitude Error", value: "magError" },
  { label: "Magnitude NST", value: "magNst" },
  { label: "Tsunami", value: "tsunami" },
];

export const createDebouncedResize = (callback: () => void) => {
  return debounce(callback, 250);
};

export interface DataPoint {
  [key: string]: any;
  x: number;
  y: number;
}

export type Column<T, K extends keyof T> = {
  header: string;
  key: K;
  render?: (value: T[K], item: T) => React.ReactNode;
};

export const generateLimiterOptions = (totalCount: number): { label: string; value: number }[] => {
  if (totalCount <= 10) return [{ label: totalCount.toString(), value: totalCount }];

  const options = [];
  let option = 50;

  while (option <= totalCount) {
    options.push({ label: option.toString(), value: option });
    if (option < 100) {
      option += 50;
    } else {
      option += 100;
    }
  }

  return [...options, { label: totalCount.toString(), value: totalCount }];
};

export const transformData = (data: Earthquake[], xAxis: string, yAxis: string): DataPoint[] => {
  return data
    .filter((earthquake) => {
      const xValue = earthquake[xAxis as keyof Earthquake];
      const yValue = earthquake[yAxis as keyof Earthquake];
      return (
        xValue !== null &&
        xValue !== undefined &&
        !isNaN(Number(xValue)) &&
        yValue !== null &&
        yValue !== undefined &&
        !isNaN(Number(yValue))
      );
    })
    .map((earthquake) => ({
      x: Number(earthquake[xAxis as keyof Earthquake]),
      y: Number(earthquake[yAxis as keyof Earthquake]),
      ...earthquake,
    }));
};

export const calculateDomains = (transformedData: DataPoint[]) => {
  if (transformedData.length === 0) return null;

  const xMin = d3.min(transformedData, (d) => d.x) || 0;
  const xMax = d3.max(transformedData, (d) => d.x) || 0;
  const yMin = d3.min(transformedData, (d) => d.y) || 0;
  const yMax = d3.max(transformedData, (d) => d.y) || 0;

  const xPadding = (xMax - xMin) * 0.05;
  const yPadding = (yMax - yMin) * 0.05;

  return {
    x: [xMin - xPadding, xMax + xPadding] as [number, number],
    y: [yMin - yPadding, yMax + yPadding] as [number, number],
  };
};

export const createTooltip = (tooltipElement: HTMLDivElement, tooltipStyle: TooltipStyle) => {
  return d3
    .select(tooltipElement)
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", tooltipStyle.backgroundColor)
    .style("border", tooltipStyle.border)
    .style("border-radius", tooltipStyle.borderRadius)
    .style("padding", "8px")
    .style("pointer-events", "none");
};

export const getAxisLabels = (xAxis: string, yAxis: string) => ({
  x: numericFields.find((f) => f.value === xAxis)?.label || "X Axis",
  y: numericFields.find((f) => f.value === yAxis)?.label || "Y Axis",
});
