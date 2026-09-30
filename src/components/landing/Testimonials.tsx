import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Teams already shipping with Aether
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A few of the product teams using Aether in production today.
          </p>
        </div>

        {/* Column layout instead of a uniform grid — quotes of different
            lengths settle naturally rather than forcing equal card heights. */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="mb-5 break-inside-avoid rounded-xl border border-border bg-card p-6"
            >
              <p className="text-sm leading-relaxed text-foreground">
                “{t.quote}”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-aether-gradient text-xs font-medium text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
