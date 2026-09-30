import { creditBalance } from "@/data/dashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CreditBalanceCard() {
  const remaining = creditBalance.total - creditBalance.used;
  const percentUsed = Math.round((creditBalance.used / creditBalance.total) * 100);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Credit balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-3xl font-semibold">
            {remaining.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">
            / {creditBalance.total.toLocaleString()} credits
          </span>
        </div>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-aether-gradient"
            style={{ width: `${percentUsed}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {percentUsed}% used this billing cycle
        </p>

        <Button variant="outline" size="sm" className="mt-5 w-full">
          Upgrade plan
        </Button>
      </CardContent>
    </Card>
  );
}
