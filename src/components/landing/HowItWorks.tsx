import { motion } from "framer-motion";
import { processSteps } from "@/data/process";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border bg-muted/40 py-24 sm:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            From API key to production, in one afternoon
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps — no scaffolding to write, no design system to
            invent first.
          </p>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {/* Connecting line behind the step markers, desktop only */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block"
            style={{ marginInline: "16.66%" }}
          />

          {processSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background font-display text-sm font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <h3 className="mb-2 font-display text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
