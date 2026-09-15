"use client";

/** Newsletter sign-up. Static site: the request is delivered to the club WhatsApp number. */
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { newsletterSchema } from "@/lib/validation";
import { whatsappUrl, newsletterMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [state, setState] = useState<{ status: "idle" | "ready" | "error"; message?: string; url?: string }>({ status: "idle" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!parsed.success) return setState({ status: "error", message: parsed.error.issues[0]?.message ?? "Enter a valid email address" });
    setState({ status: "ready", url: whatsappUrl(newsletterMessage(parsed.data.email)) });
  }

  if (state.status === "ready" && state.url) {
    return (
      <div className={cn("flex flex-wrap items-center gap-3 text-sm", className)} role="status">
        <span className="inline-flex items-center gap-2 text-primary"><CheckCircle2 className="size-4" aria-hidden /> Almost there — send the request via WhatsApp.</span>
        <a href={state.url} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-medium text-white hover:bg-[#1ebe5b]">
          <Send className="size-4" aria-hidden /> Send Via WhatsApp
        </a>
      </div>
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
        <button type="submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Send className="size-4" aria-hidden /> Subscribe
        </button>
      </div>
      {state.status === "error" && <p className="mt-2 text-xs text-destructive" role="alert">{state.message}</p>}
    </form>
  );
}
