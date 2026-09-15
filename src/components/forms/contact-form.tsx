"use client";

/** Contact form for the static (GitHub Pages) build. Swapped in by `next.config.ts` when STATIC_EXPORT=1. */
import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { contactSchema, zodErrors } from "@/lib/validation";
import { submitStaticForm, mailBody, hasDeliveryChannel } from "@/lib/static-forms";
import { cn } from "@/lib/utils";

const field =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [state, setState] = useState<{ status: "idle" | "success" | "error"; message?: string }>({ status: "idle" });
  const [pending, setPending] = useState(false);
  const err = (k: string) => errors[k]?.[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = e.currentTarget;
    const parsed = contactSchema.safeParse(Object.fromEntries(new FormData(fd)));
    if (!parsed.success) {
      setErrors(zodErrors(parsed.error));
      setState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }
    setErrors({});
    setPending(true);
    const d = parsed.data;
    const r = await submitStaticForm("contact", { name: d.name, email: d.email, subject: d.subject, message: d.message }, { subject: `[Website] ${d.subject}`, body: `${mailBody([["Name", d.name], ["Email", d.email]])}\n\n${d.message}` });
    setPending(false);
    if (!r.ok) return setState({ status: "error", message: r.message });
    setState({ status: "success", message: r.via === "endpoint" ? "Thanks for reaching out. The Executive Committee will reply by email." : "Your email app has opened with the message filled in. Press send to deliver it." });
  }

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-primary/30 bg-secondary/60 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Message ready</h3>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {!hasDeliveryChannel && (
        <p className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300" role="status">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> Online submissions are being set up. Until then, please reach the Executive Committee at the college in person.
        </p>
      )}
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
      <button type="submit" disabled={pending} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-blue/25 hover:bg-primary/90 disabled:opacity-60">
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
        Send message
      </button>
    </form>
  );
}
