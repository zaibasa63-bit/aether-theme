export interface HeroDemoStep {
  prompt: string;
  result: string;
  resultLabel: string;
}

/**
 * The hero demo loops through these prompt/result pairs to show Aether
 * handling a few different AI SaaS use cases (copy, code, data).
 * Replace with real product examples before shipping.
 */
export const heroDemoSteps: HeroDemoStep[] = [
  {
    prompt: "Write a launch tweet for our new analytics dashboard",
    resultLabel: "Generated copy",
    result:
      "Your data, finally readable. 📊 Aether Analytics turns raw events into decisions — live dashboards, zero SQL required. Try it free →",
  },
  {
    prompt: "Generate a React hook for debounced search input",
    resultLabel: "Generated code",
    result:
      "function useDebouncedValue(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}",
  },
  {
    prompt: "Summarize this week's support tickets by theme",
    resultLabel: "Generated summary",
    result:
      "Top themes: billing confusion (34%), onboarding friction (28%), API rate limits (19%). Suggest a pricing FAQ update and a guided setup checklist.",
  },
];
