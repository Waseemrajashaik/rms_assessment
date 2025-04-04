/**
 * Utility functions and constants for earthquake data visualization.
 * Includes D3.js helpers, data transformation, and UI configuration.
 */

import { debounce } from "lodash";
import { DataPoint, Earthquake, TooltipStyle } from "@/types";
import * as d3 from "d3";

/**
 * Default margin configuration for D3 visualizations
 */
export const defaultMargin = {
  bottom: 40,
  left: 50,
  right: 30,
  top: 20,
} as const;

/**
 * Default styling for tooltip elements
 */
export const defaultTooltipStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  border: "1px solid #ccc",
  borderRadius: "4px",
} as const;

/**
 * Available columns for earthquake data display
 */
export const columnOptions = [
  { label: "Time", value: "time", type: "date" },
  { label: "Magnitude", value: "magnitude", type: "number" },
  { label: "Location", value: "place", type: "string" },
  { label: "Depth (km)", value: "depth", type: "number" },
  { label: "Latitude", value: "latitude", type: "number" },
  { label: "Longitude", value: "longitude", type: "number" },
  { label: "Type", value: "type", type: "string" },
  { label: "Status", value: "status", type: "string" },
  { label: "Tsunami", value: "tsunami", type: "boolean" },
  { label: "Significance", value: "sig", type: "number" },
  { label: "Network", value: "net", type: "string" },
  { label: "Code", value: "code", type: "string" },
  { label: "Stations", value: "nst", type: "number" },
  { label: "Distance (km)", value: "dmin", type: "number" },
  { label: "RMS", value: "rms", type: "number" },
  { label: "Gap (°)", value: "gap", type: "number" },
  { label: "Magnitude Type", value: "magType", type: "string" },
  { label: "Alert", value: "alert", type: "string" },
  { label: "Updated", value: "updated", type: "date" },
];

/**
 * Numeric fields from column options for axis selection
 */
export const numericFields = columnOptions.filter((column) => column.type === "number");

/**
 * Creates a debounced resize handler for responsive visualizations
 */
export const createDebouncedResize = (callback: () => void) => {
  return debounce(callback, 250);
};

/**
 * Generates options for limiting displayed items
 * @param totalCount - Total number of available items
 */
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

/**
 * Transforms earthquake data into scatter plot points
 * @param data - Array of earthquake data
 * @param xAxis - Selected x-axis field
 * @param yAxis - Selected y-axis field
 */
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

/**
 * Calculates domain ranges for scatter plot axes
 * @param transformedData - Array of transformed data points
 */
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

/**
 * Renders grid lines for a D3.js visualization
 * @param g - The D3 selection of the SVG group element
 * @param xScale - The D3 scale for the x-axis
 * @param yScale - The D3 scale for the y-axis
 * @param width - The width of the visualization area
 * @param height - The height of the visualization area
 * @param showGrid - Whether to show the grid lines
 */
export const renderGrid = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  width: number,
  height: number,
  showGrid: boolean
) => {
  if (!showGrid) return;

  const xGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat(() => "");
  const yGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat(() => "");

  g.append("g")
    .attr("class", "grid x-grid")
    .attr("transform", `translate(0,${height})`)
    .call(xGrid)
    .attr("opacity", 0.1);

  g.append("g")
    .attr("class", "grid y-grid")
    .call(yGrid)
    .attr("opacity", 0.1);
};

/**
 * Renders x and y axes for a D3.js visualization
 * @param g - The D3 selection of the SVG group element
 * @param xScale - The D3 scale for the x-axis
 * @param yScale - The D3 scale for the y-axis
 * @param width - The width of the visualization area
 * @param height - The height of the visualization area
 * @param axisLabels - Object containing labels for x and y axes
 * @returns Object containing references to the x and y axis elements
 */
export const renderAxes = (
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  width: number,
  height: number,
  axisLabels: { x: string; y: string }
) => {
  const xAxis = g
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  xAxis
    .append("text")
    .attr("x", width / 2)
    .attr("y", 35)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text(axisLabels.x);

  const yAxis = g
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale));

  yAxis
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", -height / 2)
    .attr("fill", "currentColor")
    .attr("text-anchor", "middle")
    .text(axisLabels.y);

  return { xAxis, yAxis };
};

/**
 * Calculates the style properties for a data point based on its selection state
 * @param d - The data point
 * @param selectedRow - The currently selected earthquake data
 * @param pointStyle - Object containing base style properties for points
 * @returns Object containing the calculated style properties
 */
export const getPointStyle = (
  d: DataPoint,
  selectedRow: Earthquake | null,
  pointStyle: { size: number; color: string; opacity: number }
) => {
  const isSelected = selectedRow && d.time === selectedRow.time;
  return {
    r: isSelected ? pointStyle.size * 1.5 : pointStyle.size / 2,
    fill: isSelected ? "#f59e0b" : pointStyle.color,
    stroke: isSelected ? "#000" : "none",
    strokeWidth: isSelected ? 2 : 0,
    opacity: isSelected ? 1 : pointStyle.opacity,
  };
};

/**
 * Handles the resize behavior of a D3.js visualization
 * @param containerRef - Reference to the container element
 * @param svg - The D3 selection of the SVG element
 * @param xScale - The D3 scale for the x-axis
 * @param yScale - The D3 scale for the y-axis
 * @param points - The D3 selection of point elements
 * @param xAxis - The D3 selection of the x-axis element
 * @param yAxis - The D3 selection of the y-axis element
 * @param g - The D3 selection of the main group element
 * @param config - Configuration object containing margin and grid settings
 * @param renderGrid - Function to render grid lines
 */
export const handleResize = (
  containerRef: React.RefObject<HTMLDivElement | null>,
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  xScale: d3.ScaleLinear<number, number>,
  yScale: d3.ScaleLinear<number, number>,
  points: d3.Selection<SVGCircleElement, DataPoint, SVGGElement, unknown>,
  xAxis: d3.Selection<SVGGElement, unknown, null, undefined>,
  yAxis: d3.Selection<SVGGElement, unknown, null, undefined>,
  g: d3.Selection<SVGGElement, unknown, null, undefined>,
  config: {
    margin: { left: number; right: number; top: number; bottom: number };
    showGrid: boolean;
  },
  renderGrid: (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    xScale: d3.ScaleLinear<number, number>,
    yScale: d3.ScaleLinear<number, number>,
    width: number,
    height: number,
    showGrid: boolean
  ) => void
) => {
  if (!containerRef.current) return;

  const newWidth = containerRef.current.clientWidth;
  const newHeight = containerRef.current.clientHeight;
  const updatedWidth = newWidth - config.margin.left - config.margin.right;
  const updatedHeight = newHeight - config.margin.top - config.margin.bottom;

  // Update SVG dimensions
  svg.attr("width", newWidth).attr("height", newHeight);

  // Update scales
  xScale.range([0, updatedWidth]);
  yScale.range([updatedHeight, 0]);

  // Update points
  points
    .transition()
    .duration(300)
    .attr("cx", (d) => xScale(d.x))
    .attr("cy", (d) => yScale(d.y));

  // Update axes
  xAxis
    .attr("transform", `translate(0,${updatedHeight})`)
    .transition()
    .duration(300)
    .call(d3.axisBottom(xScale));

  yAxis.transition().duration(300).call(d3.axisLeft(yScale));

  // Update grid
  if (config.showGrid) {
    g.selectAll(".grid").remove();
    renderGrid(g, xScale, yScale, updatedWidth, updatedHeight, config.showGrid);
  }
};
