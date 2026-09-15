"use client";

import { Search } from "lucide-react";

/** Shared ID / reference input used by the member area, status, card and verification pages. */
export function LookupBox({ label, placeholder, value, onChange, onSubmit, hint, buttonLabel = "Look up" }: { label: string; placeholder: string; value: string; onChange: (v: string) => void; onSubmit: () => void; hint?: string; buttonLabel?: string }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="rounded-3xl border border-border/80 bg-card p-5 sm:p-6"
    >
      <label htmlFor="lookup" className="block text-sm font-medium">{label}</label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input id="lookup" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoCapitalize="characters" spellCheck={false} className="h-12 flex-1 rounded-xl border border-border bg-background px-4 font-mono text-sm uppercase tracking-wider outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" />
        <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Search className="size-4" aria-hidden /> {buttonLabel}
        </button>
      </div>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </form>
  );
}
