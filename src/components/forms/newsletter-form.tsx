"use client";

/** Newsletter sign-up for the static (GitHub Pages) build. Swapped in by `next.config.ts` when STATIC_EXPORT=1. */
import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { newsletterSchema } from "@/lib/validation";
import { submitStaticForm } from "@/lib/static-forms";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [state, setState] = useState<{ status: "idle" | "success" | "error"; message?: string }>({ status: "idle" });
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setState({ status: "error", message: parsed.error.issues[0]?.message ?? "Enter a valid email address" });
    setPending(true);
    const r = await submitStaticForm("newsletter", { email: parsed.data.email }, { subject: "Newsletter subscription", body: `Please add ${parsed.data.email} to the Tech & AI Innovation Club newsletter.` });
    setPending(false);
    if (!r.ok) return setState({ status: "error", message: r.message });
    setState({ status: "success", message: r.via === "endpoint" ? "You are on the list. Welcome!" : "Your email app has opened. Press send to subscribe." });
  }

  if (state.status === "success") {
    return (
      <p className={cn("flex items-center gap-2 text-sm text-primary", className)} role="status">
        <CheckCircle2 className="size-4" aria-hidden /> {state.message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className={cn("flex gap-2", compact ? "flex-col xl:flex-row" : "flex-col sm:flex-row")}>
        <label className="sr-only" htmlFor={`newsletter-email-${compact ? "c" : "f"}`}>Email address</label>
        <input
          id={`newsletter-email-${compact ? "c" : "f"}`}
          type="email"
          name="email"
          required
          placeholder="you@college.edu.np"
          className={cn("h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30", state.status === "error" && "border-destructive")}
          aria-invalid={state.status === "error"}
        />
        <button type="submit" disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          Subscribe
        </button>
      </div>
      {state.status === "error" && <p className="mt-2 text-xs text-destructive" role="alert">{state.message}</p>}
    </form>
  );
}
