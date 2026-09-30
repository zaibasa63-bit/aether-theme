export const promptCategories = [
  "Marketing",
  "Development",
  "Support",
  "Writing",
  "Analytics",
] as const;

export type PromptCategory = (typeof promptCategories)[number];

export interface SavedPrompt {
  id: string;
  title: string;
  category: PromptCategory;
  content: string;
  uses: number;
  favorite: boolean;
}

export const promptLibrary: SavedPrompt[] = [
  {
    id: "p1",
    title: "Product launch tweet",
    category: "Marketing",
    content: "Write a launch tweet for [product] announcing [key benefit]. Keep it under 280 characters, confident but not exclamatory.",
    uses: 24,
    favorite: true,
  },
  {
    id: "p2",
    title: "Debounced input hook",
    category: "Development",
    content: "Generate a React hook that debounces a value by [delay]ms, fully typed in TypeScript, with cleanup on unmount.",
    uses: 41,
    favorite: true,
  },
  {
    id: "p3",
    title: "Weekly support ticket summary",
    category: "Support",
    content: "Summarize this week's support tickets by theme. Include percentage breakdown and one suggested action per theme.",
    uses: 12,
    favorite: false,
  },
  {
    id: "p4",
    title: "Blog post outline",
    category: "Writing",
    content: "Create a blog post outline about [topic] for a technical audience. Include an intro hook, 4 body sections, and a conclusion.",
    uses: 8,
    favorite: false,
  },
  {
    id: "p5",
    title: "Churn cohort breakdown",
    category: "Analytics",
    content: "Analyze the attached churn data by signup cohort. Identify the cohort with the highest churn rate and propose two hypotheses.",
    uses: 6,
    favorite: false,
  },
  {
    id: "p6",
    title: "Unit test scaffold",
    category: "Development",
    content: "Write a unit test scaffold for [function name] using Vitest, covering the happy path, an edge case, and an error case.",
    uses: 19,
    favorite: true,
  },
  {
    id: "p7",
    title: "Onboarding email sequence",
    category: "Marketing",
    content: "Draft a 3-email onboarding sequence for new [product] signups: welcome, feature highlight, and a check-in at day 7.",
    uses: 15,
    favorite: false,
  },
  {
    id: "p8",
    title: "Customer apology response",
    category: "Support",
    content: "Write an empathetic response to a customer reporting [issue]. Acknowledge the problem, explain next steps, avoid over-promising.",
    uses: 9,
    favorite: false,
  },
];
