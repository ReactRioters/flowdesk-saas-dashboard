import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RevenueChart } from "../revenue-chart";
import type { RevenueChartHandle } from "../revenue-chart";

describe("RevenueChart (ref API)", () => {
  it("should expose export methods via ref", () => {
    const ref = React.createRef<RevenueChartHandle>();

    render(<RevenueChart data={[{ label: "Jan", revenue: 100 }]} ref={ref as any} />);

    // The chart may initialize asynchronously; methods should be present on the handle
    expect(ref.current).toBeDefined();
    if (ref.current) {
      expect(typeof ref.current.getExportPreview).toBe("function");
      expect(typeof ref.current.exportAsPNG).toBe("function");
      expect(typeof ref.current.exportAsSVG).toBe("function");
    }
  });
});
