import { useState } from "react";
import { Check, Copy, KeyRound, Plus, Trash2 } from "lucide-react";
import {
  apiKeys as seedKeys,
  apiScopes,
  generateFakeKey,
  type ApiKey,
  type ApiScope,
} from "@/data/apiKeys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

let idCounter = 0;

function maskKey(fullKey: string) {
  return `${fullKey.slice(0, 8)}${"•".repeat(12)}${fullKey.slice(-4)}`;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(seedKeys);
  const [showCreate, setShowCreate] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftScopes, setDraftScopes] = useState<ApiScope[]>(["chat"]);
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function toggleScope(scope: ApiScope) {
    setDraftScopes((prev) =>
      prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope],
    );
  }

  function handleCreate() {
    if (!draftName.trim()) return;
    const fullKey = generateFakeKey();
    idCounter += 1;
    setKeys((prev) => [
      {
        id: `local_${idCounter}`,
        name: draftName.trim(),
        preview: maskKey(fullKey),
        created: "Just now",
        lastUsed: "Never",
        scopes: draftScopes.length ? draftScopes : ["chat"],
      },
      ...prev,
    ]);
    setRevealedKey(fullKey);
    setDraftName("");
    setDraftScopes(["chat"]);
    setShowCreate(false);
  }

  function revokeKey(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function handleCopyRevealed() {
    if (!revealedKey) return;
    navigator.clipboard?.writeText(revealedKey).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-lg font-semibold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Keys used to authenticate requests to Aether's API.
          </p>
        </div>
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus className="h-4 w-4" />
          Create key
        </Button>
      </div>

      {/* One-time reveal panel — the only moment the full key is visible */}
      {revealedKey && (
        <Card className="border-primary/40 bg-primary/5">
          <CardContent className="pt-6">
            <p className="mb-2 text-sm font-medium">
              Copy your new key now — you won't be able to see it again.
            </p>
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5">
              <KeyRound className="h-4 w-4 shrink-0 text-muted-foreground" />
              <code className="flex-1 truncate font-mono text-sm">{revealedKey}</code>
              <button
                onClick={handleCopyRevealed}
                className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Copy key"
              >
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <Button size="sm" variant="outline" className="mt-3" onClick={() => setRevealedKey(null)}>
              I've copied it
            </Button>
          </CardContent>
        </Card>
      )}

      {showCreate && (
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <Label htmlFor="key-name">Key name</Label>
              <Input
                id="key-name"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="e.g. Production backend"
              />
            </div>
            <div className="space-y-2">
              <Label>Scopes</Label>
              <div className="flex flex-wrap gap-4">
                {apiScopes.map((scope) => (
                  <label key={scope} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={draftScopes.includes(scope)}
                      onCheckedChange={() => toggleScope(scope)}
                    />
                    {scope}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowCreate(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Generate key</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Active keys</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="divide-y divide-border">
            {keys.map((key) => (
              <div key={key.id} className="flex flex-wrap items-center gap-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <KeyRound className="h-4 w-4 text-muted-foreground" />
                </span>
                <div className="min-w-[200px] flex-1">
                  <p className="text-sm font-medium">{key.name}</p>
                  <code className="text-xs text-muted-foreground">{key.preview}</code>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {key.scopes.map((scope) => (
                    <span
                      key={scope}
                      className={cn(
                        "rounded-full bg-secondary/10 px-2 py-0.5 text-[11px] font-medium text-secondary",
                      )}
                    >
                      {scope}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">
                  Created {key.created} · Last used {key.lastUsed}
                </div>
                <button
                  onClick={() => revokeKey(key.id)}
                  className="ml-auto rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-destructive"
                  aria-label="Revoke key"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
