import { useEffect, useRef, useState } from "react";
import { Bot, History, Plus, Search, Send, Sparkles } from "lucide-react";
import {
  chatConversations,
  mockReplies,
  type ChatConversation,
  type ChatMessage,
} from "@/data/chatHistory";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

let messageCounter = 0;
function nextId() {
  messageCounter += 1;
  return `local_${messageCounter}`;
}

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

interface ConversationListProps {
  conversations: ChatConversation[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

/** The conversation list itself — rendered both in the desktop aside and
 *  inside a Sheet drawer on mobile, so it's never unreachable. */
function ConversationList({ conversations, activeId, onSelect, onNewChat }: ConversationListProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-display text-sm font-semibold">Chat history</h2>
        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onNewChat}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="border-b border-border p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search conversations"
            className="h-9 w-full rounded-md border border-input bg-background pl-8 pr-3 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>
      <div className="flex-1 space-y-1 overflow-y-auto p-2">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              "w-full rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-muted",
              c.id === activeId && "bg-primary/10",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium">{c.title}</span>
              <span className="shrink-0 text-[11px] text-muted-foreground">{c.updatedAt}</span>
            </div>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{c.preview}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(chatConversations);
  const [activeId, setActiveId] = useState(chatConversations[0].id);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [active?.messages.length, isTyping]);

  function updateConversation(id: string, updater: (c: ChatConversation) => ChatConversation) {
    setConversations((prev) => prev.map((c) => (c.id === id ? updater(c) : c)));
  }

  function handleSend() {
    const text = draft.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: nextId(),
      role: "user",
      content: text,
      time: nowLabel(),
    };

    updateConversation(active.id, (c) => ({
      ...c,
      preview: text,
      updatedAt: "Just now",
      messages: [...c.messages, userMessage],
    }));
    setDraft("");
    setIsTyping(true);

    // No backend wired up — this stands in for a streaming model response.
    // Replace with a real request to your chat endpoint.
    setTimeout(() => {
      const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      updateConversation(active.id, (c) => ({
        ...c,
        messages: [
          ...c.messages,
          { id: nextId(), role: "assistant", content: reply, time: nowLabel() },
        ],
      }));
      setIsTyping(false);
    }, 1100);
  }

  function handleNewChat() {
    const newConv: ChatConversation = {
      id: nextId(),
      title: "New conversation",
      preview: "No messages yet",
      updatedAt: "Just now",
      messages: [],
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
    setMobileHistoryOpen(false);
  }

  function handleSelect(id: string) {
    setActiveId(id);
    setMobileHistoryOpen(false);
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-5">
      {/* History sidebar — desktop only */}
      <aside className="hidden w-72 shrink-0 rounded-xl border border-border bg-card sm:block">
        <ConversationList
          conversations={conversations}
          activeId={active.id}
          onSelect={handleSelect}
          onNewChat={handleNewChat}
        />
      </aside>

      {/* History drawer — mobile only, opened from the chat header below */}
      <Sheet open={mobileHistoryOpen} onOpenChange={setMobileHistoryOpen}>
        <SheetContent side="left" className="sm:hidden">
          <ConversationList
            conversations={conversations}
            activeId={active.id}
            onSelect={handleSelect}
            onNewChat={handleNewChat}
          />
        </SheetContent>
      </Sheet>

      {/* Chat panel */}
      <div className="flex flex-1 flex-col rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border p-4">
          <button
            onClick={() => setMobileHistoryOpen(true)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted sm:hidden"
            aria-label="Open chat history"
          >
            <History className="h-4 w-4" />
          </button>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Bot className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-medium">{active.title}</h2>
            <p className="text-xs text-muted-foreground">Aether AI · gpt-4-class model</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-5">
          {active.messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Sparkles className="mb-3 h-6 w-6" />
              <p className="text-sm">Start the conversation below.</p>
            </div>
          )}

          {active.messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                  message.role === "user"
                    ? "bg-aether-gradient text-white"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {message.role === "user" ? "You" : <Bot className="h-4 w-4" />}
              </span>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                  message.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-muted",
                )}
              >
                {message.content.includes("\n") ? (
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                    {message.content}
                  </pre>
                ) : (
                  <p className="leading-relaxed">{message.content}</p>
                )}
                <p
                  className={cn(
                    "mt-1.5 text-[10px] opacity-70",
                    message.role === "user" ? "text-right" : "text-left",
                  )}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Bot className="h-4 w-4" />
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-end gap-3">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message Aether AI..."
              className="min-h-[44px] flex-1 resize-none"
              rows={1}
            />
            <Button size="icon" onClick={handleSend} disabled={!draft.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Enter to send, Shift + Enter for a new line.
          </p>
        </div>
      </div>
    </div>
  );
}
