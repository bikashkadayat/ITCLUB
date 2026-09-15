"use client";

import { useMemo, useState } from "react";
import { FileText, Download, Search, ExternalLink, BookOpen } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { cn, formatDate } from "@/lib/utils";

const labels: Record<string, string> = { NOTES: "Notes", RESEARCH_PAPER: "Research Papers", PRESENTATION: "Presentations", CLUB_DOCUMENT: "Club Documents", LEARNING_RESOURCE: "Learning Resources" };

export interface LibraryItem { id: string; title: string; description: string | null; category: string; tags: string[]; href: string; fileName: string | null; department: string | null; downloads: number; createdAt: string }

export function ResourceLibrary({ items }: { items: LibraryItem[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [tag, setTag] = useState<string | null>(null);
  const tags = useMemo(() => [...new Set(items.flatMap((i) => i.tags))].sort().slice(0, 24), [items]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return items.filter((i) => (cat === "All" || i.category === cat) && (!tag || i.tags.includes(tag)) && (!s || [i.title, i.description ?? "", ...i.tags].join(" ").toLowerCase().includes(s)));
  }, [items, q, cat, tag]);
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search resources</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search notes, papers, slides…" className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" />
        </label>
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
          {["All", ...Object.keys(labels)].map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted")}>{c === "All" ? "All" : labels[c]}</button>
          ))}
        </div>
      </div>
      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <button key={t} onClick={() => setTag(tag === t ? null : t)} aria-pressed={tag === t} className={cn("rounded-full px-2.5 py-0.5 font-mono text-xs lg:text-[11px]", tag === t ? "bg-brand-coral text-white" : "bg-muted text-muted-foreground hover:bg-secondary")}>#{t}</button>
          ))}
        </div>
      )}
      {list.length ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <li key={r.id} className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 card-hover">
              <div className="flex items-center justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary"><FileText className="size-4" /></span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs lg:text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{labels[r.category] ?? r.category}</span>
              </div>
              <h3 className="mt-4 font-semibold leading-snug">{r.title}</h3>
              {r.description && <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{r.description}</p>}
              <div className="mt-2 flex flex-wrap gap-1">{r.tags.map((t) => (<span key={t} className="font-mono text-xs lg:text-[10px] text-muted-foreground">#{t}</span>))}</div>
              <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                <span>{r.department ?? "Club"} · {formatDate(r.createdAt, { month: "short" })} · {r.downloads} downloads</span>
                <a href={r.href} target="_blank" rel="noopener" className="inline-flex items-center gap-1 font-medium text-primary">{r.fileName ? <><Download className="size-3.5" /> Download</> : <><ExternalLink className="size-3.5" /> Open</>}</a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState className="mt-6" icon={BookOpen} title="No resources match" description="Try another search, or check back after the next departmental cycle." />
      )}
    </div>
  );
}
