"use client";

/**
 * Membership application. Runs entirely in the browser (GitHub Pages has no
 * server, database or email): validates, assigns an application reference
 * (TAIC-APP-YYYYMMDD-XXXX) and opens WhatsApp with the full application addressed
 * to the Executive Committee. Nothing is sent anywhere else.
 */
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
import { departments } from "@/data/departments";
import { membership } from "@/data/membership";
import { Thumb } from "@/components/shared/photo";
import { applicationSchema, zodErrors } from "@/lib/validation";
import { whatsappUrl, membershipMessage, newApplicationRef, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const field = "h-12 w-full rounded-xl border border-border bg-background px-4 text-base outline-none sm:h-11 sm:text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive";

export function MembershipForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [ready, setReady] = useState<{ ref: string; url: string } | null>(null);
  const toggle = (slug: string) => setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length >= 2 ? s : [...s, slug]));
  const err = (k: string) => errors[k]?.[0];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = applicationSchema.safeParse({
      name: fd.get("name") ?? "",
      email: fd.get("email") ?? "",
      phone: fd.get("phone") ?? "",
      program: fd.get("program") ?? "",
      semester: fd.get("semester") ?? "",
      departments: fd.getAll("departments").map(String),
      skills: fd.get("skills") ?? "",
      motivation: fd.get("motivation") ?? "",
      agree: fd.get("agree") === "on",
      website: fd.get("website") ?? "",
    });
    if (!parsed.success) {
      setErrors(zodErrors(parsed.error));
      setMessage({ ok: false, text: "Please fix the highlighted fields." });
      return;
    }
    setErrors({});
    const d = parsed.data;
    const ref = newApplicationRef();
    const deptNames = d.departments.map((slug) => departments.find((x) => x.slug === slug)?.name ?? slug);
    const message = membershipMessage({ name: d.name, email: d.email, phone: d.phone, program: d.program, semester: `${d.semester} Semester`, department: deptNames.join(", "), skills: d.skills ?? "", motivation: d.motivation, ref });
    const url = whatsappUrl(message);
    setMessage(null);
    setReady({ ref, url });
    // Opens WhatsApp straight away; this runs inside the submit gesture so browsers allow it.
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (ready) return <ReadyToSend ready={ready} />;

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <ol className="grid grid-cols-1 gap-2 rounded-2xl border border-border/80 bg-muted/40 p-3 text-xs text-muted-foreground sm:grid-cols-4">
        {[["1", "Fill Application Form", ""], ["2", "Send Application via WhatsApp", ""], ["3", "Executive Committee Reviews", ""], ["4", "Receive Confirmation", ""]].map(([n, t, d]) => (
          <li key={n} className="flex gap-2.5 rounded-xl bg-card px-3 py-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs lg:text-[10px] font-semibold text-primary-foreground">{n}</span>
            <span><span className="block font-medium text-foreground">{t}</span>{d || null}</span>
          </li>
        ))}
      </ol>
      <fieldset className="space-y-4">
        <legend className="text-sm font-medium uppercase tracking-wider text-muted-foreground">About you</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full name" id="name" error={err("name")}><input id="name" name="name" required autoComplete="name" className={field} aria-invalid={Boolean(err("name"))} /></Field>
          <Field label="Email" id="email" error={err("email")}><input id="email" name="email" type="email" required autoComplete="email" className={field} aria-invalid={Boolean(err("email"))} /></Field>
          <Field label="Phone number" id="phone" error={err("phone")}><input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="98XXXXXXXX" className={field} aria-invalid={Boolean(err("phone"))} /></Field>
          <Field label="Program" id="program" error={err("program")}>
            <select id="program" name="program" required defaultValue="" className={field} aria-invalid={Boolean(err("program"))}>
              <option value="" disabled>Select program</option>
              {membership.programs.map((p) => (<option key={p} value={p}>{p}</option>))}
            </select>
          </Field>
          <Field label="Semester" id="semester" error={err("semester")}>
            <select id="semester" name="semester" required defaultValue="" className={field} aria-invalid={Boolean(err("semester"))}>
              <option value="" disabled>Select semester</option>
              {membership.semesters.map((s) => (<option key={s} value={s}>{s} Semester</option>))}
            </select>
          </Field>
          <Field label="Skills (optional)" id="skills" error={err("skills")}><input id="skills" name="skills" placeholder="e.g. Python, React, public speaking" className={field} /></Field>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Department interest</legend>
        <p className="mt-1 text-sm text-muted-foreground">Pick up to two departments. You can always switch later.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {departments.map((d) => {
            const on = selected.includes(d.slug);
            const disabled = !on && selected.length >= 2;
            return (
              <label key={d.slug} className={cn("flex min-w-0 cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all", on ? "border-primary/50 bg-secondary/70 ring-2 ring-primary/20" : "border-border/80 bg-card hover:bg-muted", disabled && "cursor-not-allowed opacity-50")}>
                <input type="checkbox" name="departments" value={d.slug} checked={on} disabled={disabled} onChange={() => toggle(d.slug)} className="sr-only" />
                <Thumb name={d.visual} className="size-10" />
                <span className="min-w-0"><span className="block text-sm font-medium">{d.name}</span><span className="block text-xs text-muted-foreground sm:truncate">{d.tagline}</span></span>
                <span className={cn("ml-auto size-5 shrink-0 rounded-full border-2", on ? "border-primary bg-primary" : "border-border")} aria-hidden>{on && <CheckCircle2 className="size-full text-primary-foreground" />}</span>
              </label>
            );
          })}
        </div>
        {err("departments") && <p className="mt-2 text-xs text-destructive" role="alert">{err("departments")}</p>}
      </fieldset>

      <Field label="Why do you want to join, and what would you love to build?" id="motivation" error={err("motivation")}>
        <textarea id="motivation" name="motivation" required rows={5} enterKeyHint="done" placeholder="No experience needed. Curiosity counts." className={cn(field, "h-auto py-3")} aria-invalid={Boolean(err("motivation"))} />
      </Field>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="agree" className="mt-1 size-5 shrink-0 rounded border-border accent-[var(--primary)] sm:size-4" />
        <span>I am a student enrolled in good standing at Tech AI College of Management &amp; Law, and I agree to the Club <a href="/constitution" className="text-primary underline underline-offset-4">Constitution</a> and Code of Conduct.</span>
      </label>
      {err("agree") && <p className="-mt-4 text-xs text-destructive" role="alert">{err("agree")}</p>}

      {message && (
        <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          <AlertCircle className="size-4 shrink-0" aria-hidden /> {message.text}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" className="inline-flex h-13 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:h-12 sm:w-auto sm:text-sm">
          <Send className="size-4" aria-hidden /> Submit application
        </button>
        <p className="text-xs text-muted-foreground">WhatsApp opens with your application addressed to the Executive Committee ({WHATSAPP_DISPLAY}).</p>
      </div>
    </form>
  );
}

/** Shown after submit. WhatsApp has already been opened in a new tab; the button re-opens it if the tab was blocked or closed. */
function ReadyToSend({ ready }: { ready: { ref: string; url: string } }) {
  const btn = useRef<HTMLAnchorElement>(null);
  useEffect(() => btn.current?.focus(), []);
  return (
    <div className="rounded-3xl border border-primary/30 bg-secondary/50 p-6 text-center sm:p-10" role="status" aria-live="polite">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="size-7" aria-hidden /></span>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight">Your membership information is ready to be sent to the Executive Committee via WhatsApp.</h3>
      <p className="mt-3 text-sm text-muted-foreground">Press send in WhatsApp to deliver it. If WhatsApp did not open, use the button below.</p>
      <a ref={btn} href={ready.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/30 transition-colors hover:bg-[#1ebe5b] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366]/40">
        <Send className="size-4" aria-hidden /> Send Via WhatsApp
      </a>
      <div className="mt-8 rounded-2xl border border-border/80 bg-card p-4 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Application reference</p>
        <p className="mt-1 font-mono text-lg tracking-wider text-primary">{ready.ref}</p>
      </div>
    </div>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive" role="alert">{error}</p>}
    </div>
  );
}
