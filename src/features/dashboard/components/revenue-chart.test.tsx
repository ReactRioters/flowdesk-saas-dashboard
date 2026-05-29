import React from "react";
import { render, screen } from "@testing-library/react";

// Mock recharts to avoid ResizeObserver and svg complexities in JSDOM.
jest.mock("recharts", () => {
  const React = require("react");

  const ResponsiveContainer = ({ children }: any) => React.createElement("div", { "data-testid": "responsive" }, children);
  const BarChart = (props: any) => React.createElement("div", { "data-testid": "bar-chart" });
  const LineChart = (props: any) => React.createElement("div", { "data-testid": "line-chart" });
  const XAxis = () => React.createElement("div", null);
  const YAxis = () => React.createElement("div", null);
  const CartesianGrid = () => React.createElement("div", null);
  const Tooltip = () => React.createElement("div", null);
  const Bar = () => React.createElement("div", null);
  const Line = () => React.createElement("div", null);

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
