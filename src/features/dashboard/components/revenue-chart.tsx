import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { ChartEmptyState } from "../../../components/ui/chart-empty-state";

type RevenueChartProps = {
  data: {
    label: string;
    revenue: number;
  }[];
  chartType?: "bar" | "line";
};

export type RevenueChartHandle = {
  exportAsPNG: (fileName?: string) => Promise<void>;
  exportAsSVG: (fileName?: string) => Promise<void>;
};

export const RevenueChart = forwardRef<RevenueChartHandle, RevenueChartProps>(
  ({ data, chartType = "bar" }: RevenueChartProps, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      exportAsSVG: async (fileName = "chart.svg") => {
        if (!containerRef.current) return;
        const svg = containerRef.current.querySelector("svg");
        if (!svg) return;

        // Clone SVG, inline computed styles, and add background to preserve dark/light mode
        const original = svg as unknown as SVGElement;
        const cloned = original.cloneNode(true) as SVGElement;

        const width = original.clientWidth || parseInt(original.getAttribute("width") || "800", 10);
        const height = original.clientHeight || parseInt(original.getAttribute("height") || "400", 10);
        cloned.setAttribute("width", String(width));
        cloned.setAttribute("height", String(height));

        const bgColor = getComputedStyle(document.body).backgroundColor || "#ffffff";
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", bgColor);
        cloned.insertBefore(rect, cloned.firstChild);

        const originals = Array.from(original.querySelectorAll("*"));
        const clones = Array.from(cloned.querySelectorAll("*"));
        const propsToCopy = [
          "fill",
          "stroke",
          "stroke-width",
          "font-size",
          "font-family",
          "font-weight",
          "color",
          "opacity",
          "text-anchor",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-dasharray",
          "shape-rendering",
        ];

        for (let i = 0; i < originals.length && i < clones.length; i++) {
          const o = originals[i] as Element;
          const c = clones[i] as Element;
          const cs = getComputedStyle(o as Element);
          const styles: string[] = [];
          for (const prop of propsToCopy) {
            const val = cs.getPropertyValue(prop);
            if (val) styles.push(`${prop}:${val}`);
          }
          if (styles.length) {
            const prev = c.getAttribute("style") || "";
            c.setAttribute("style", `${prev};${styles.join(";")}`);
          }
        }

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(cloned as unknown as Node);
        const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      },
      exportAsPNG: async (fileName = "chart.png") => {
        if (!containerRef.current) return;
        const svg = containerRef.current.querySelector("svg");
        if (!svg) return;

        // Prepare cloned SVG with inlined styles and background
        const original = svg as unknown as SVGElement;
        const cloned = original.cloneNode(true) as SVGElement;

        const width = original.clientWidth || parseInt(original.getAttribute("width") || "800", 10);
        const height = original.clientHeight || parseInt(original.getAttribute("height") || "400", 10);
        cloned.setAttribute("width", String(width));
        cloned.setAttribute("height", String(height));

        const bgColor = getComputedStyle(document.body).backgroundColor || "#ffffff";
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", bgColor);
        cloned.insertBefore(rect, cloned.firstChild);

        const originals = Array.from(original.querySelectorAll("*"));
        const clones = Array.from(cloned.querySelectorAll("*"));
        const propsToCopy = [
          "fill",
          "stroke",
          "stroke-width",
          "font-size",
          "font-family",
          "font-weight",
          "color",
          "opacity",
          "text-anchor",
          "stroke-linecap",
          "stroke-linejoin",
          "stroke-dasharray",
          "shape-rendering",
        ];

        for (let i = 0; i < originals.length && i < clones.length; i++) {
          const o = originals[i] as Element;
          const c = clones[i] as Element;
          const cs = getComputedStyle(o as Element);
          const styles: string[] = [];
          for (const prop of propsToCopy) {
            const val = cs.getPropertyValue(prop);
            if (val) styles.push(`${prop}:${val}`);
          }
          if (styles.length) {
            const prev = c.getAttribute("style") || "";
            c.setAttribute("style", `${prev};${styles.join(";")}`);
          }
        }

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(cloned as unknown as Node);
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = url;
        await new Promise((res, rej) => {
          img.onload = () => res(true);
          img.onerror = (e) => rej(e);
        });

        const canvas = document.createElement("canvas");
        canvas.width = width || 800;
        canvas.height = height || 400;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        await new Promise<void>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              URL.revokeObjectURL(url);
              reject(new Error("Failed to generate PNG"));
              return;
            }

            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = pngUrl;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(pngUrl);
            URL.revokeObjectURL(url);
            resolve();
          });
        });
      },
    }));

    if (!data.length) {
    return (
      <ChartEmptyState
        title="No revenue data"
        description="Revenue analytics will appear once transactions are available."
      />
    );
  }
    return (
      <div className="h-[320px] w-full" ref={containerRef}>
      <ResponsiveContainer width="100%" height="100%">
        <div className="relative h-full w-full">
          <div
            aria-hidden={chartType !== "line"}
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out transform origin-center ${
              chartType === "line" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.15}
              />

              <XAxis dataKey="label" />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </div>

          <div
            aria-hidden={chartType !== "bar"}
            className={`absolute inset-0 transition-opacity duration-300 ease-in-out transform origin-center ${
              chartType === "bar" ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.15}
              />

              <XAxis dataKey="label" />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip />

              <Bar
                dataKey="revenue"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </div>
        </div>
      </ResponsiveContainer>
      </div>
    );
  }
);
