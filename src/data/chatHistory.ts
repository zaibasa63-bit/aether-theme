export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
}

export interface ChatConversation {
  id: string;
  title: string;
  preview: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export const chatConversations: ChatConversation[] = [
  {
    id: "conv_1",
    title: "Launch tweet draft",
    preview: "Your data, finally readable. 📊 Aether Analytics...",
    updatedAt: "2m ago",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Write a launch tweet for our new analytics dashboard",
        time: "10:02 AM",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Your data, finally readable. 📊 Aether Analytics turns raw events into decisions — live dashboards, zero SQL required. Try it free →",
        time: "10:02 AM",
      },
      {
        id: "m3",
        role: "user",
        content: "Make it a bit shorter and less exclamatory",
        time: "10:04 AM",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "Raw events, turned into decisions. Aether Analytics — live dashboards, no SQL required.",
        time: "10:04 AM",
      },
    ],
  },
  {
    id: "conv_2",
    title: "Debounce hook",
    preview: "function useDebouncedValue(value, delay = 300)...",
    updatedAt: "1h ago",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Generate a React hook for debounced search input",
        time: "9:10 AM",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "function useDebouncedValue(value, delay = 300) {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const t = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(t);\n  }, [value, delay]);\n  return debounced;\n}",
        time: "9:10 AM",
      },
    ],
  },
  {
    id: "conv_3",
    title: "Support ticket themes",
    preview: "Top themes: billing confusion (34%)...",
    updatedAt: "Yesterday",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Summarize this week's support tickets by theme",
        time: "4:45 PM",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Top themes: billing confusion (34%), onboarding friction (28%), API rate limits (19%). Suggest a pricing FAQ update and a guided setup checklist.",
        time: "4:46 PM",
      },
    ],
  },
];

/** Canned replies the mock assistant cycles through for any new message. */
export const mockReplies = [
  "Here's a draft based on what you described — let me know if you'd like a different tone.",
  "Got it. I've put together an answer below; happy to adjust the length or level of detail.",
  "That's a reasonable approach. Here's how I'd structure it, with a couple of alternatives worth considering.",
];
