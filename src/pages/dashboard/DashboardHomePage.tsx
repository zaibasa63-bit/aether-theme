import { kpiStats } from "@/data/dashboardStats";
import { StatCard } from "@/components/dashboard/StatCard";
import { UsageChart } from "@/components/dashboard/UsageChart";
import { CreditBalanceCard } from "@/components/dashboard/CreditBalanceCard";
import { RecentGenerationsList } from "@/components/dashboard/RecentGenerationsList";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">
          Welcome back, Ada
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across your AI features this week.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpiStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UsageChart />
        </div>
        <CreditBalanceCard />
      </div>

      <RecentGenerationsList />
    </div>
  );
}
