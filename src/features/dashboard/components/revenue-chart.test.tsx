import React from "react";
import { render, screen } from "@testing-library/react";

// Mock recharts to avoid ResizeObserver and svg complexities in JSDOM.
jest.mock("recharts", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactModule = require("react");

  const ResponsiveContainer = ({ children }: { children: React.ReactNode }) =>
    ReactModule.createElement("div", { "data-testid": "responsive" }, children);
  const BarChart = () =>
    ReactModule.createElement("div", { "data-testid": "bar-chart" });
  const LineChart = () =>
    ReactModule.createElement("div", { "data-testid": "line-chart" });
  const XAxis = () => ReactModule.createElement("div", null);
  const YAxis = () => ReactModule.createElement("div", null);
  const CartesianGrid = () => ReactModule.createElement("div", null);
  const Tooltip = () => ReactModule.createElement("div", null);
  const Bar = () => ReactModule.createElement("div", null);
  const Line = () => ReactModule.createElement("div", null);

  return {
    __esModule: true,
    ResponsiveContainer,
    BarChart,
    LineChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,
    Line,
  };
});

import { RevenueChart } from "./revenue-chart";

const mockData = [
  { label: "Jan", revenue: 100 },
  { label: "Feb", revenue: 200 },
  { label: "Mar", revenue: 150 },
];

describe("RevenueChart", () => {
  it("renders a bar chart when chartType is 'bar'", () => {
    render(<RevenueChart data={mockData} chartType="bar" />);
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("renders a line chart when chartType is 'line'", () => {
    render(<RevenueChart data={mockData} chartType="line" />);
    expect(screen.getByTestId("line-chart")).toBeInTheDocument();
  });
});
