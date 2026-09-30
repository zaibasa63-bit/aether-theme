import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIGenerationDemo } from "@/components/landing/AIGenerationDemo";

const trustStats = [
  { value: "12,400+", label: "products built" },
  { value: "4.9/5", label: "average rating" },
  { value: "98.9%", label: "uptime SLA" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-aether-radial pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="container grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            Rated 4.9 by 2,300+ product teams
          </div>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Ship AI features your users actually reach for
          </h1>

          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Aether gives you the chat, generation, and analytics surfaces
            most AI products need — pre-built, fully typed, and ready to
            connect to your own models.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg">
              Start building free
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <PlayCircle className="h-4 w-4" />
              Watch 2-min demo
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-semibold">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: live AI generation demo — the hero's centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <AIGenerationDemo />
        </motion.div>
      </div>
    </section>
  );
}
