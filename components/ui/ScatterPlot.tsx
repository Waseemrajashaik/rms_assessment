/**
 * A D3.js-based scatter plot for earthquake data visualization.
 * Features: Interactive axes selection, point highlighting, tooltips, responsive design, grid lines.
 */

"use client";
import { ScatterPlotProps } from "@/types";
import {
  calculateDomains,
  createDebouncedResize,
  createTooltip,
  DataPoint,
  defaultMargin,
  defaultTooltipStyle,
  getAxisLabels,
  getPointStyle,
  handleResize,
  numericFields,
  renderAxes,
  renderGrid,
  transformData,
} from "@/utils";
import * as d3 from "d3";
import React, { useEffect, useMemo, useRef } from "react";

import { Select } from "./Select";

/**
 * Renders an interactive scatter plot with dynamic axis selection and responsive design.
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
  // Selected axes for data visualization
  const [xAxis, setXAxis] = React.useState("magnitude");
  const [yAxis, setYAxis] = React.useState("depth");
  
  // DOM element references
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cached plot configuration and calculations
  const config = useMemo(
    () => ({
      margin,
      showGrid,
      showTooltip,
      pointStyle: {
        color: pointColor,
        opacity: pointOpacity,
        size: pointSize,
      },
    }),
    [margin, showGrid, showTooltip, pointColor, pointOpacity, pointSize]
  );

  const transformedData = useMemo(
    () => transformData(data, xAxis, yAxis),
    [data, xAxis, yAxis]
  );

  const domains = useMemo(
    () => calculateDomains(transformedData),
    [transformedData]
  );

  const axisLabels = useMemo(
    () => getAxisLabels(xAxis, yAxis),
    [xAxis, yAxis]
  );

  // Cached tooltip configuration
  const tooltip = useMemo(
    () => (tooltipElement: HTMLDivElement) => createTooltip(tooltipElement, tooltipStyle),
    [tooltipStyle]
  );

  /**
   * Main rendering effect that sets up and updates the scatter plot visualization
   * - Creates and updates scales
   * - Renders grid lines and axes
   * - Handles point rendering and styling
   * - Sets up interactivity and tooltips
   * - Manages resize behavior
   */
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !tooltipRef.current || !domains) return;

    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    const width = containerWidth - config.margin.left - config.margin.right;
    const height = containerHeight - config.margin.top - config.margin.bottom;

    // Setup SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", containerWidth).attr("height", containerHeight);

    // Create scales
    const xScale = d3.scaleLinear().domain(domains.x).nice().range([0, width]);
    const yScale = d3.scaleLinear().domain(domains.y).nice().range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${config.margin.left},${config.margin.top})`);

    // Initial grid rendering
    renderGrid(g, xScale, yScale, width, height, config.showGrid);

    // Axes rendering
    const { xAxis, yAxis } = renderAxes(g, xScale, yScale, width, height, axisLabels);

    // Setup tooltip
    const tooltipElement = tooltip(tooltipRef.current);

    // Add and style points
    const points = g
      .selectAll<SVGCircleElement, DataPoint>("circle")
      .data(transformedData)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .each(function(d) {
        const style = getPointStyle(d, selectedRow, config.pointStyle);
        d3.select(this)
          .attr("r", style.r)
          .attr("fill", style.fill)
          .attr("stroke", style.stroke)
          .attr("stroke-width", style.strokeWidth)
          .attr("opacity", style.opacity);
      });

    // Single sort for selected points
    points.sort((a, b) => {
      const aSelected = selectedRow && a.time === selectedRow.time;
      const bSelected = selectedRow && b.time === selectedRow.time;
      return aSelected ? 1 : bSelected ? -1 : 0;
    });

    // Add interactivity
    if (config.showTooltip) {
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

    const debouncedResize = createDebouncedResize(() =>
      handleResize(
        containerRef,
        svg,
        xScale,
        yScale,
        points,
        xAxis,
        yAxis,
        g,
        config,
        renderGrid
      )
    );
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [
    data,
    domains,
    config,
    selectedRow,
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
            onChange={(value: string | string[]) => setXAxis(value as string)}
            options={numericFields}
            value={xAxis}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Y Axis</label>
          <Select
            onChange={(value: string | string[]) => setYAxis(value as string)}
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
