import { TrendingDown, TrendingUp } from "lucide-react";
import type { KpiStat } from "@/data/dashboardStats";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({ stat }: { stat: KpiStat }) {
  const Icon = stat.icon;
  const isUp = stat.trend === "up";

  return (
    <Card>
      <CardContent className="flex items-start justify-between pt-6">
        <div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
          <div className="mt-2 font-display text-2xl font-semibold">
            {stat.value}
          </div>
          <div
            className={cn(
              "mt-2 flex items-center gap-1 text-xs font-medium",
              isUp ? "text-success" : "text-destructive",
            )}
          >
            {isUp ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {stat.delta}
            <span className="font-normal text-muted-foreground">
              vs last week
            </span>
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
