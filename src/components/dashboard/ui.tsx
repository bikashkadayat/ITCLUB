import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon, tone = "blue", href }: { label: string; value: React.ReactNode; hint?: string; icon: LucideIcon; tone?: "blue" | "coral" | "neutral"; href?: string }) {
  const inner = (
    <div className="flex h-full items-start justify-between rounded-2xl border border-border/80 bg-card p-5 transition-colors hover:border-primary/40">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{value}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <span className={cn("flex size-10 items-center justify-center rounded-xl", tone === "blue" && "bg-secondary text-primary", tone === "coral" && "bg-accent text-accent-foreground", tone === "neutral" && "bg-muted text-muted-foreground")}>
        <Icon className="size-5" aria-hidden />
      </span>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export function Panel({ title, description, action, children, className }: { title?: string; description?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn("min-w-0 rounded-2xl border border-border/80 bg-card", className)}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-3 border-b border-border/70 px-5 py-4">
          <div>
            {title && <h2 className="font-semibold">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      <div className="min-w-0 p-5">{children}</div>
    </section>
  );
}

const tones: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  APPROVED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  PUBLISHED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  COMPLETED: "bg-primary/10 text-primary",
  REGISTERED: "bg-primary/10 text-primary",
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  WAITLISTED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  DRAFT: "bg-muted text-muted-foreground",
  IDEA: "bg-muted text-muted-foreground",
  PLANNING: "bg-secondary text-secondary-foreground",
  TESTING: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  INACTIVE: "bg-muted text-muted-foreground",
  CANCELLED: "bg-destructive/10 text-destructive",
  REJECTED: "bg-destructive/10 text-destructive",
  SUSPENDED: "bg-destructive/10 text-destructive",
  NEW: "bg-brand-coral/10 text-brand-coral",
  READ: "bg-muted text-muted-foreground",
  REPLIED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  ARCHIVED: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider", tones[status] ?? "bg-muted text-muted-foreground", className)}>{status.replace(/_/g, " ").toLowerCase()}</span>;
}

export function Empty({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border px-6 py-10 text-center">
      <p className="font-medium">{title}</p>
      {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export const inputClass = "h-10 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive disabled:opacity-60";
export const textareaClass = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive";
export const btnPrimary = "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";
export const btnSecondary = "inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-60";
export const btnDanger = "inline-flex h-9 items-center justify-center gap-2 rounded-full bg-destructive/10 px-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-60";

export function Field({ label, id, error, hint, children, className }: { label: string; id: string; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="mt-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border/80">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">{children}</tbody>
      </table>
    </div>
  );
}
