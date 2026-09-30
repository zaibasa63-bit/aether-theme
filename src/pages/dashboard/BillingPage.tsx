import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Download, Loader2 } from "lucide-react";
import { currentPlan, invoices, paymentMethod, usageMetrics } from "@/data/billing";
import { useMockAction } from "@/lib/useMockAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Paid: "bg-success/10 text-success",
  Pending: "bg-accent/10 text-accent",
  Failed: "bg-destructive/10 text-destructive",
};

export default function BillingPage() {
  const [confirmingCancel, setConfirmingCancel] = useState(false);

  const upgrade = useMockAction({ successMessage: "Redirecting to checkout...", delay: 700 });
  const cancelSub = useMockAction({ successMessage: "Subscription cancelled" });
  const updatePayment = useMockAction({ successMessage: "Payment method updated successfully" });

  function handleDownload(invoiceId: string) {
    toast.success(`Downloading ${invoiceId}...`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-lg font-semibold">Usage & Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your plan, payment method, and view invoice history.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Current plan */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-2xl font-semibold">{currentPlan.name}</div>
                <p className="text-sm text-muted-foreground">{currentPlan.price}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Active
              </span>
            </div>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground">
              <p>Renews on {currentPlan.renewalDate}</p>
              <p>{currentPlan.seats}</p>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => upgrade.run()} disabled={upgrade.loading}>
                {upgrade.loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {upgrade.loading ? "Redirecting..." : "Upgrade plan"}
              </Button>

              {confirmingCancel ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    disabled={cancelSub.loading}
                    onClick={() => cancelSub.run(() => setConfirmingCancel(false))}
                  >
                    {cancelSub.loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {cancelSub.loading ? "Cancelling..." : "Confirm cancel"}
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setConfirmingCancel(false)}>
                    Keep plan
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setConfirmingCancel(true)}>
                  Cancel subscription
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment method */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Payment method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 rounded-lg border border-border p-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <CreditCard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium">
                  {paymentMethod.brand} •••• {paymentMethod.last4}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires {paymentMethod.expiry}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-4"
              onClick={() => updatePayment.run()}
              disabled={updatePayment.loading}
            >
              {updatePayment.loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {updatePayment.loading ? "Updating..." : "Update payment method"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage breakdown */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Usage this cycle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {usageMetrics.map((metric) => {
            const Icon = metric.icon;
            const percent = Math.round((metric.used / metric.limit) * 100);
            return (
              <div key={metric.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {metric.label}
                  </span>
                  <span className="text-muted-foreground">
                    {metric.used.toLocaleString()} / {metric.limit.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      percent > 90 ? "bg-destructive" : "bg-aether-gradient",
                    )}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Invoice history */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Invoice history</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="pb-3 font-medium">Invoice</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="py-3 font-medium">{invoice.id}</td>
                    <td className="py-3 text-muted-foreground">{invoice.date}</td>
                    <td className="py-3 text-muted-foreground">{invoice.amount}</td>
                    <td className="py-3">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1 text-xs font-medium",
                          statusStyles[invoice.status],
                        )}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleDownload(invoice.id)}
                        className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label="Download invoice"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
