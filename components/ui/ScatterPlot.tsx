/**
 * ScatterPlot Component
 * 
 * A D3.js-based scatter plot visualization component for earthquake data.
 * Provides interactive features including:
 * - Customizable axes selection
 * - Point highlighting on selection
 * - Interactive tooltips
 * - Responsive resizing
 * - Grid lines
 */

"use client";
import { Earthquake } from "@/types";
import {
  calculateDomains,
  createDebouncedResize,
  createTooltip,
  DataPoint,
  defaultMargin,
  defaultTooltipStyle,
  getAxisLabels,
  numericFields,
  TooltipStyle,
  transformData,
} from "@/utils";
import * as d3 from "d3";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { Select } from "./Select";

/**
 * Props for the ScatterPlot component
 * @property {Earthquake[]} data - Array of earthquake data points
 * @property {Object} margin - Chart margins (optional)
 * @property {string} pointColor - Color of data points (optional)
 * @property {number} pointOpacity - Opacity of data points (optional)
 * @property {number} pointSize - Size of data points (optional)
 * @property {Earthquake | null} selectedRow - Currently selected earthquake
 * @property {(row: Earthquake | null) => void} setSelectedRow - Callback for row selection
 * @property {boolean} showGrid - Whether to show grid lines (optional)
 * @property {boolean} showTooltip - Whether to show tooltips (optional)
 * @property {string} title - Chart title (optional)
 * @property {TooltipStyle} tooltipStyle - Custom tooltip styling (optional)
 */
interface ScatterPlotProps {
  data: Earthquake[];
  margin?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  pointColor?: string;
  pointOpacity?: number;
  pointSize?: number;
  selectedRow: Earthquake | null;
  setSelectedRow: (row: Earthquake | null) => void;
  showGrid?: boolean;
  showTooltip?: boolean;
  title?: string;
  tooltipStyle?: TooltipStyle;
}

/**
 * ScatterPlot Component
 * 
 * Renders an interactive scatter plot visualization of earthquake data using D3.js.
 * Supports dynamic axis selection, point highlighting, and responsive resizing.
 * 
 * @param {ScatterPlotProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export function ScatterPlot({
  data,
  margin = defaultMargin,
  pointColor = "#8884d8",
  pointOpacity = 0.6,
  pointSize = 8,
  selectedRow,
  setSelectedRow,
  showGrid = true,
  showTooltip = true,
  title = "Earthquake Scatter Plot",
  tooltipStyle = defaultTooltipStyle,
}: ScatterPlotProps) {
  // State for axis selection
  const [xAxis, setXAxis] = React.useState("magnitude");
  const [yAxis, setYAxis] = React.useState("depth");
  
  // Refs for DOM elements
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized data transformations and calculations
  const transformedData = useMemo(() => transformData(data, xAxis, yAxis), [data, xAxis, yAxis]);
  const domains = useMemo(() => calculateDomains(transformedData), [transformedData]);
  const axisLabels = useMemo(() => getAxisLabels(xAxis, yAxis), [xAxis, yAxis]);

  // Memoized tooltip creation
  const tooltip = useCallback(
    (tooltipElement: HTMLDivElement) => createTooltip(tooltipElement, tooltipStyle),
    [tooltipStyle]
  );

  // Effect for updating point styles when selection changes
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const points = svg.selectAll<SVGCircleElement, DataPoint>("circle");

    points
      .transition()
      .duration(300)
      .attr("r", (d) =>
        selectedRow && d.time === selectedRow.time ? pointSize * 1.5 : pointSize / 2
      )
      .attr("fill", (d) =>
        selectedRow && d.time === selectedRow.time ? "#f59e0b" : pointColor
      )
      .attr("stroke", (d) =>
        selectedRow && d.time === selectedRow.time ? "#000" : "none"
      )
      .attr("stroke-width", (d) =>
        selectedRow && d.time === selectedRow.time ? 2 : 0
      )
      .attr("opacity", (d) =>
        selectedRow && d.time === selectedRow.time ? 1 : pointOpacity
      );

    // Sort points to ensure selected point is on top
    points.sort((a, b) => {
      const aSelected = selectedRow && a.time === selectedRow.time;
      const bSelected = selectedRow && b.time === selectedRow.time;
      return aSelected ? 1 : bSelected ? -1 : 0;
    });
  }, [selectedRow, pointColor, pointOpacity, pointSize]);

  // Effect for rendering and updating the scatter plot
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !tooltipRef.current || !domains) return;

    // Calculate dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    // Setup SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", containerWidth).attr("height", containerHeight);

    // Create scales
    const xScale = d3.scaleLinear().domain(domains.x).nice().range([0, width]);
    const yScale = d3.scaleLinear().domain(domains.y).nice().range([height, 0]);

    // Create main group for chart
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Add grid lines if enabled
    if (showGrid) {
      const xGrid = d3.axisBottom(xScale).tickSize(-height).tickFormat(() => "");
      const yGrid = d3.axisLeft(yScale).tickSize(-width).tickFormat(() => "");

      g.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height})`)
        .call(xGrid)
        .attr("opacity", 0.1);

      g.append("g").attr("class", "grid").call(yGrid).attr("opacity", 0.1);
    }

    // Add axes
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

    const yAxis = g.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    yAxis
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .text(axisLabels.y);

    // Setup tooltip
    const tooltipElement = tooltip(tooltipRef.current);

    // Add data points
    const points = g
      .selectAll<SVGCircleElement, DataPoint>("circle")
      .data(transformedData)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", (d) =>
        selectedRow && d.time === selectedRow.time ? pointSize * 1.5 : pointSize / 2
      )
      .attr("fill", (d) =>
        selectedRow && d.time === selectedRow.time ? "#f59e0b" : pointColor
      )
      .attr("stroke", (d) =>
        selectedRow && d.time === selectedRow.time ? "#000" : "none"
      )
      .attr("stroke-width", (d) =>
        selectedRow && d.time === selectedRow.time ? 2 : 0
      )
      .attr("opacity", (d) =>
        selectedRow && d.time === selectedRow.time ? 1 : pointOpacity
      );

    // Sort points to ensure selected point is on top
    points.sort((a, b) => {
      const aSelected = selectedRow && a.time === selectedRow.time;
      const bSelected = selectedRow && b.time === selectedRow.time;
      return aSelected ? 1 : bSelected ? -1 : 0;
    });

    // Add interactivity
    if (showTooltip) {
      points
        .on("click", (event, d) => {
          const earthquake = data.find((e) => e.time === d.time);
          if (earthquake) setSelectedRow(earthquake);
        })
        .on("mouseover", (event, d) => {
          tooltipElement
            .style("opacity", 1)
            .style("left", "50%")
            .style("top", "0")
            .style("transform", "translateX(-50%)")
            .html(`
              ${axisLabels.x}: ${d.x.toFixed(2)}<br/>
              ${axisLabels.y}: ${d.y.toFixed(2)}
            `);
        })
        .on("mouseout", () => {
          tooltipElement.style("opacity", 0);
        });
    }

    // Handle window resize
    const debouncedResize = createDebouncedResize(() => {
      if (!containerRef.current) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      const updatedWidth = newWidth - margin.left - margin.right;
      const updatedHeight = newHeight - margin.top - margin.bottom;

      // Update SVG dimensions
      svg.attr("width", newWidth).attr("height", newHeight);

      // Update scales
      xScale.range([0, updatedWidth]);
      yScale.range([updatedHeight, 0]);

      // Update points position
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

      // Update grid if enabled
      if (showGrid) {
        g.selectAll(".grid").remove();

        g.append("g")
          .attr("class", "grid")
          .attr("transform", `translate(0,${updatedHeight})`)
          .call(d3.axisBottom(xScale).tickSize(-updatedHeight).tickFormat(() => ""))
          .attr("opacity", 0.1);

        g.append("g")
          .attr("class", "grid")
          .call(d3.axisLeft(yScale).tickSize(-updatedWidth).tickFormat(() => ""))
          .attr("opacity", 0.1);
      }
    });

    // Add and cleanup resize listener
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [
    data,
    domains,
    margin,
    pointColor,
    pointOpacity,
    pointSize,
    selectedRow,
    showGrid,
    showTooltip,
    tooltip,
    axisLabels,
    setSelectedRow,
    transformedData,
  ]);

  return (
    <div className="w-full flex flex-col">
      {title && <h2 className="text-base font-semibold text-gray-800 mb-2">{title}</h2>}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">X Axis</label>
          <Select
            onChange={useCallback((value: string | string[]) => setXAxis(value as string), [])}
            options={numericFields}
            value={xAxis}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Y Axis</label>
          <Select
            onChange={useCallback((value: string | string[]) => setYAxis(value as string), [])}
            options={numericFields}
            value={yAxis}
          />
        </div>
      </div>
      <div className="relative aspect-[4/3]" ref={containerRef}>
        <div className="absolute pointer-events-none" ref={tooltipRef} />
        <svg className="w-full h-full" ref={svgRef} />
      </div>
    </div>
  );
}
