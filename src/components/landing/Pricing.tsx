import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricingPlans } from "@/data/pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="py-24 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple pricing that scales with usage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when your generations do.
          </p>
        </div>

        {/* Monthly / yearly toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              !yearly ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Monthly
          </span>
          <Switch
            checked={yearly}
            onCheckedChange={setYearly}
            aria-label="Toggle yearly pricing"
          />
          <span
            className={cn(
              "text-sm font-medium",
              yearly ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Yearly
          </span>
          <span className="ml-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
            Save 20%
          </span>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card
                className={cn(
                  "relative h-full",
                  plan.highlighted && "border-primary shadow-lg shadow-primary/10",
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most popular
                  </div>
                )}
                <CardHeader>
                  <h3 className="font-display text-xl font-semibold">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-semibold">
                      ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-sm text-muted-foreground">
                        /month
                      </span>
                    )}
                  </div>
                  {yearly && plan.monthlyPrice > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      billed annually
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    className="mb-6 w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        <span className="text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
