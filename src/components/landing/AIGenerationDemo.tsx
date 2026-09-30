import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";
import { heroDemoSteps } from "@/data/heroDemo";
import { useTypewriter } from "@/lib/useTypewriter";

type Phase = "typing" | "thinking" | "result" | "hold";

const PHASE_DURATIONS: Record<Extract<Phase, "thinking" | "hold">, number> = {
  thinking: 700,
  hold: 2600,
};

/**
 * The hero's single orchestrated animation: a prompt types itself out,
 * a brief "thinking" state plays, then the result streams in word by
 * word. Loops through heroDemoSteps to showcase a few use cases.
 *
 * This is the one bold, non-user-triggered motion moment on the landing
 * page — everything else stays quiet by design.
 */
export function AIGenerationDemo() {
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const step = heroDemoSteps[stepIndex];

  const { output: typedPrompt, done: typingDone } = useTypewriter(step.prompt, {
    typingSpeed: 28,
    holdDuration: 0,
  });

  // Advance the phase machine: typing -> thinking -> result -> hold -> next step
  useEffect(() => {
    if (phase === "typing" && typingDone) {
      const t = setTimeout(() => setPhase("thinking"), 200);
      return () => clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("result"), PHASE_DURATIONS.thinking);
      return () => clearTimeout(t);
    }
    if (phase === "result") {
      const t = setTimeout(() => setPhase("hold"), 900);
      return () => clearTimeout(t);
    }
    if (phase === "hold") {
      const t = setTimeout(() => {
        setStepIndex((i) => (i + 1) % heroDemoSteps.length);
        setPhase("typing");
      }, PHASE_DURATIONS.hold);
      return () => clearTimeout(t);
    }
  }, [phase, typingDone]);

  const resultWords = step.result.split(/(\s+)/);

  return (
    <div className="glass-strong relative w-full max-w-md rounded-2xl p-5 shadow-2xl shadow-primary/10">
      {/* Window chrome */}
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        <span className="ml-3 text-xs text-muted-foreground">
          Aether AI — playground
        </span>
      </div>

      {/* Prompt row */}
      <div className="mb-3 rounded-lg border border-border bg-background/60 px-3 py-2.5">
        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <Wand2 className="h-3 w-3" />
          Prompt
        </div>
        <p className="min-h-[2.5rem] text-sm text-foreground">
          {typedPrompt}
          {phase === "typing" && (
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-caret-blink bg-primary align-middle" />
          )}
        </p>
      </div>

      {/* Result card */}
      <div className="rounded-lg border border-border bg-background/60 px-3 py-2.5">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-secondary">
          <Sparkles className="h-3 w-3" />
          {step.resultLabel}
        </div>

        <AnimatePresence mode="wait">
          {phase === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 py-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}

          {(phase === "result" || phase === "hold") && (
            <motion.pre
              key={`result-${stepIndex}`}
              className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground"
            >
              {resultWords.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.012 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.pre>
          )}
        </AnimatePresence>
      </div>

      {/* Step indicator dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {heroDemoSteps.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === stepIndex ? "w-4 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
