import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usageOverTime } from "@/data/dashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Recharts needs literal color values for SVG fills/strokes — it can't
// resolve Tailwind classes or CSS variables the way DOM elements can.
// These mirror the brand tokens in src/index.css (--primary, --secondary,
// --accent) so the chart stays visually in sync with the rest of the UI.
const SERIES = [
  { key: "chat", name: "AI Chat", color: "#8B5CF6" },
  { key: "image", name: "Image Gen", color: "#06B6D4" },
  { key: "code", name: "Code Assistant", color: "#F59E0B" },
] as const;

export function UsageChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Generations this week</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Broken down by surface
          </p>
        </div>
        <div className="flex gap-4">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.name}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageOverTime} margin={{ left: -20, right: 10, top: 10 }}>
              <defs>
                {SERIES.map((s) => (
                  <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={s.color} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "0.8rem",
                }}
              />
              {SERIES.map((s) => (
                <Area
                  key={s.key}
                  type="monotone"
                  dataKey={s.key}
                  name={s.name}
                  stroke={s.color}
                  strokeWidth={2}
                  fill={`url(#fill-${s.key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
