import { Bot, Code2, ImageIcon } from "lucide-react";
import { recentGenerations, type RecentGeneration } from "@/data/dashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const typeIcon = { Chat: Bot, Image: ImageIcon, Code: Code2 } as const;

const statusStyles: Record<RecentGeneration["status"], string> = {
  Completed: "bg-success/10 text-success",
  Processing: "bg-accent/10 text-accent",
  Failed: "bg-destructive/10 text-destructive",
};

export function RecentGenerationsList() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent generations</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="divide-y divide-border">
          {recentGenerations.map((gen) => {
            const Icon = typeIcon[gen.type];
            return (
              <div key={gen.id} className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{gen.prompt}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {gen.type} · {gen.time} · {gen.credits} credits
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                    statusStyles[gen.status],
                  )}
                >
                  {gen.status}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
