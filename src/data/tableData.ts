export interface GenerationLogRow {
  id: string;
  type: "Chat" | "Image" | "Code";
  prompt: string;
  status: "Completed" | "Failed" | "Processing";
  credits: number;
  date: string;
}

const prompts = [
  "Summarize this week's support tickets by theme",
  "Write a launch tweet for the analytics dashboard",
  "Generate a React hook for debounced search input",
  "Product shot, wireless keyboard, studio lighting",
  "Draft a 3-email onboarding sequence",
  "Write unit tests for the billing webhook handler",
  "Isometric illustration of a cloud server rack",
  "Explain the difference between SSR and CSR",
  "Portrait of a robot mascot, friendly, rounded shapes",
  "Refactor this function to use async/await",
  "Abstract background, flowing gradient mesh",
  "Write release notes for v2.4.0",
];

const types: GenerationLogRow["type"][] = ["Chat", "Image", "Code"];
const statuses: GenerationLogRow["status"][] = ["Completed", "Completed", "Completed", "Processing", "Failed"];

function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const generationLog: GenerationLogRow[] = Array.from({ length: 24 }, (_, i) => {
  const type = types[i % types.length];
  const status = statuses[i % statuses.length];
  const daysAgo = Math.floor(pseudoRandom(i + 1) * 20) + 1;
  const date = new Date(Date.now() - daysAgo * 86_400_000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  return {
    id: `gen_${(9000 + i * 7).toString(16)}`,
    type,
    prompt: prompts[i % prompts.length],
    status,
    credits: type === "Image" ? 12 : type === "Code" ? 6 : 4,
    date,
  };
});
