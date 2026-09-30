import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Trash2 } from "lucide-react";
import { generationLog, type GenerationLogRow } from "@/data/tableData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type SortKey = keyof Pick<GenerationLogRow, "id" | "type" | "status" | "credits" | "date">;

const PAGE_SIZE = 8;

const statusStyles: Record<GenerationLogRow["status"], string> = {
  Completed: "bg-success/10 text-success",
  Processing: "bg-accent/10 text-accent",
  Failed: "bg-destructive/10 text-destructive",
};

export default function TablesPage() {
  const [rows, setRows] = useState<GenerationLogRow[]>(generationLog);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? rows.filter(
          (r) => r.prompt.toLowerCase().includes(q) || r.id.toLowerCase().includes(q),
        )
      : rows;

    const sorted = [...base].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [rows, query, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id));

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function toggleRow(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleAllOnPage() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        pageRows.forEach((r) => next.delete(r.id));
      } else {
        pageRows.forEach((r) => next.add(r.id));
      }
      return next;
    });
  }

  function deleteSelected() {
    setRows((prev) => prev.filter((r) => !selected.has(r.id)));
    setSelected(new Set());
  }

  const columns: { key: SortKey; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "credits", label: "Credits" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-lg font-semibold">Advanced Tables</h1>
        <p className="text-sm text-muted-foreground">
          Full generation log — sortable, searchable, with bulk actions.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 pb-2">
          <CardTitle>Generations</CardTitle>
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <Button size="sm" variant="outline" onClick={deleteSelected} className="text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
                Delete {selected.size}
              </Button>
            )}
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search prompt or ID..."
                className="w-56 pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="w-10 pb-3">
                    <Checkbox checked={allOnPageSelected} onCheckedChange={toggleAllOnPage} />
                  </th>
                  <th className="pb-3 font-medium">Prompt</th>
                  {columns.map((col) => (
                    <th key={col.key} className="pb-3 font-medium">
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="flex items-center gap-1 hover:text-foreground"
                      >
                        {col.label}
                        <ArrowUpDown className="h-3 w-3" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pageRows.map((row) => (
                  <tr key={row.id} className={cn(selected.has(row.id) && "bg-primary/5")}>
                    <td className="py-3">
                      <Checkbox
                        checked={selected.has(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                      />
                    </td>
                    <td className="max-w-xs truncate py-3 pr-4">{row.prompt}</td>
                    <td className="py-3 font-mono text-xs text-muted-foreground">{row.id}</td>
                    <td className="py-3 text-muted-foreground">{row.type}</td>
                    <td className="py-3">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-medium", statusStyles[row.status])}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{row.credits}</td>
                    <td className="py-3 text-muted-foreground">{row.date}</td>
                  </tr>
                ))}
                {pageRows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-muted-foreground">
                      No results.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Page {page} of {totalPages} · {filtered.length} results
            </span>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
