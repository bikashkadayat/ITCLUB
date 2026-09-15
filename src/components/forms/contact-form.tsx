"use client";

/** Contact form. Static site: the message is delivered to the club WhatsApp number. */
import { useState } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { contactSchema, zodErrors } from "@/lib/validation";
import { whatsappUrl, contactMessage, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const field =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [state, setState] = useState<{ status: "idle" | "ready" | "error"; message?: string; url?: string }>({ status: "idle" });
  const err = (k: string) => errors[k]?.[0];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(fd)));
    if (!parsed.success) {
      setErrors(zodErrors(parsed.error));
      setState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }
    setErrors({});
    const d = parsed.data;
    setState({ status: "ready", url: whatsappUrl(contactMessage(d)) });
  }

  if (state.status === "ready" && state.url) {
    return (
      <div className="rounded-3xl border border-primary/30 bg-secondary/60 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Message ready</h3>
        <p className="mt-2 text-sm text-muted-foreground">Your message is ready to be sent to the Executive Committee via WhatsApp ({WHATSAPP_DISPLAY}). Press send in WhatsApp to deliver it.</p>
        <a href={state.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#1ebe5b]">
          <Send className="size-4" aria-hidden /> Send Via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">Name</label>
          <input id="c-name" name="name" required autoComplete="name" className={field} aria-invalid={Boolean(err("name"))} />
          {err("name") && <p className="mt-1.5 text-xs text-destructive">{err("name")}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" className={field} aria-invalid={Boolean(err("email"))} />
          {err("email") && <p className="mt-1.5 text-xs text-destructive">{err("email")}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium">Subject</label>
        <input id="c-subject" name="subject" required className={field} placeholder="Partnership, sponsorship, membership, media…" aria-invalid={Boolean(err("subject"))} />
        {err("subject") && <p className="mt-1.5 text-xs text-destructive">{err("subject")}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">Message</label>
        <textarea id="c-message" name="message" required rows={6} className={cn(field, "h-auto py-3")} aria-invalid={Boolean(err("message"))} />
        {err("message") && <p className="mt-1.5 text-xs text-destructive">{err("message")}</p>}
      </div>
      {state.status === "error" && Object.keys(errors).length === 0 && (
        <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          <AlertCircle className="size-4" aria-hidden /> {state.message}
        </p>
      )}
      <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-blue/25 hover:bg-primary/90">
        <Send className="size-4" aria-hidden /> Send message
      </button>
    </form>
  );
}
