import { motion } from "framer-motion";
import { features } from "@/data/features";
import { Card, CardContent } from "@/components/ui/card";

// Each feature gets its own accent from the brand palette rather than
// repeating one color on every icon — keeps the four cards visually
// distinct instead of reading as identical repeated units.
const accentClasses = [
  "bg-primary/10 text-primary",
  "bg-secondary/10 text-secondary",
  "bg-foreground/5 text-foreground",
  "bg-accent/10 text-accent",
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything an AI product needs, already built
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four surfaces cover most of what users expect from an AI SaaS
            product. Wire each one to your own model and ship.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="h-full transition-colors hover:border-primary/40">
                  <CardContent className="pt-6">
                    <div
                      className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg ${accentClasses[i % accentClasses.length]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-display text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                    <div className="text-xs font-medium text-muted-foreground/80">
                      {feature.metric}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
