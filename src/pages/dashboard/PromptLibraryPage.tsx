import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Heart, LibraryBig, Plus, Search } from "lucide-react";
import {
  promptCategories,
  promptLibrary,
  type PromptCategory,
  type SavedPrompt,
} from "@/data/promptLibrary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

let idCounter = 0;

export default function PromptLibraryPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>(promptLibrary);
  const [activeCategory, setActiveCategory] = useState<PromptCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [draftTitle, setDraftTitle] = useState("");
  const [draftCategory, setDraftCategory] = useState<PromptCategory>(promptCategories[0]);
  const [draftContent, setDraftContent] = useState("");

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.content.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [prompts, activeCategory, query]);

  function toggleFavorite(id: string) {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    );
  }

  function handleCopy(prompt: SavedPrompt) {
    navigator.clipboard?.writeText(prompt.content).catch(() => undefined);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  function handleSaveNewPrompt() {
    if (!draftTitle.trim() || !draftContent.trim()) return;
    idCounter += 1;
    setPrompts((prev) => [
      {
        id: `local_${idCounter}`,
        title: draftTitle.trim(),
        category: draftCategory,
        content: draftContent.trim(),
        uses: 0,
        favorite: false,
      },
      ...prev,
    ]);
    setDraftTitle("");
    setDraftContent("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <LibraryBig className="h-4 w-4" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold">Prompt Library</h1>
            <p className="text-sm text-muted-foreground">
              {prompts.length} saved prompts
            </p>
          </div>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          New prompt
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
              <div className="space-y-2">
                <Label htmlFor="prompt-title">Title</Label>
                <Input
                  id="prompt-title"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  placeholder="e.g. Release notes summary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompt-category">Category</Label>
                <select
                  id="prompt-category"
                  value={draftCategory}
                  onChange={(e) => setDraftCategory(e.target.value as PromptCategory)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {promptCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt-content">Prompt</Label>
              <Textarea
                id="prompt-content"
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                placeholder="Write the reusable prompt text, using [brackets] for variables..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveNewPrompt}>Save prompt</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...promptCategories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={cn(
              "rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors",
              activeCategory === c
                ? "border-primary bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted",
            )}
          >
            {c}
          </button>
        ))}
        <div className="relative ml-auto w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Prompt grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((prompt) => (
          <Card key={prompt.id} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col pt-6">
              <div className="mb-2 flex items-start justify-between gap-2">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                  {prompt.category}
                </span>
                <button
                  onClick={() => toggleFavorite(prompt.id)}
                  aria-label="Toggle favorite"
                  className="text-muted-foreground hover:text-accent"
                >
                  <Heart
                    className={cn("h-4 w-4", prompt.favorite && "fill-accent text-accent")}
                  />
                </button>
              </div>
              <h3 className="font-display text-sm font-semibold">{prompt.title}</h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                {prompt.content}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  Used {prompt.uses} times
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(prompt)}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Copy prompt"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/dashboard/chat">
                      {copiedId === prompt.id ? "Copied!" : "Use in chat"}
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            No prompts match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
