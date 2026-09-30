import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  goalCompletion,
  latencyTrend,
  monthlyRevenue,
  trafficBySource,
  weeklySignups,
} from "@/data/chartShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "0.5rem",
  fontSize: "0.8rem",
};

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-lg font-semibold">Charts</h1>
        <p className="text-sm text-muted-foreground">
          Every chart type used across the dashboard, built directly on Recharts.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Area chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly revenue</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="revenue-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={2} fill="url(#revenue-fill)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Weekly signups</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklySignups} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="signups" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>API latency (ms)</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyTrend} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="p50" stroke="#8B5CF6" strokeWidth={2} dot={false} name="p50" />
                <Line type="monotone" dataKey="p95" stroke="#F59E0B" strokeWidth={2} dot={false} name="p95" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Donut chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Traffic by source</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficBySource}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {trafficBySource.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, ""]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {trafficBySource.map((s) => (
                <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Radial progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly generation goal</CardTitle>
          </CardHeader>
          <CardContent className="relative h-64 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={goalCompletion}
                innerRadius="70%"
                outerRadius="100%"
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="value" cornerRadius={12} background={{ fill: "hsl(var(--muted))" }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-semibold">{goalCompletion[0].value}%</span>
              <span className="text-xs text-muted-foreground">of goal</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
