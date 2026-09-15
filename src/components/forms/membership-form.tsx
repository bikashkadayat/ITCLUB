"use client";

/**
 * Membership application. Runs entirely in the browser: validates, assigns an
 * application reference (TAIC-APP-…), keeps the applicant's own copy in this
 * browser, and delivers the application to the committee through
 * NEXT_PUBLIC_FORM_ENDPOINT or the visitor's email app (JSON in the body so the
 * committee tool can import it), with a downloadable .json copy as backup.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, Loader2, Mail, Download } from "lucide-react";
import { departments } from "@/data/departments";
import { membership } from "@/data/membership";
import { DepartmentIcon } from "@/components/shared/department-icon";
import { applicationSchema, zodErrors } from "@/lib/validation";
import { submitStaticForm, mailBody, hasDeliveryChannel } from "@/lib/static-forms";
import { newApplicationRef, saveMyApplication } from "@/lib/my-application";
import { downloadText } from "@/lib/club-store";
import { cn } from "@/lib/utils";

const field = "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25 aria-invalid:border-destructive";

export function MembershipForm() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [lastJson, setLastJson] = useState<{ ref: string; json: string } | null>(null);
  const toggle = (slug: string) => setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : s.length >= 2 ? s : [...s, slug]));
  const err = (k: string) => errors[k]?.[0];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    setPending(true);
    const d = parsed.data;
    const ref = newApplicationRef();
    const submittedAt = new Date().toISOString();
    const deptNames = d.departments.map((slug) => departments.find((x) => x.slug === slug)?.name ?? slug);
    const record = { form: "membership", ref, submittedAt, name: d.name, email: d.email, phone: d.phone, program: d.program, semester: d.semester, departments: d.departments, departmentNames: deptNames.join(", "), skills: (d.skills ?? "").split(",").map((s) => s.trim()).filter(Boolean), motivation: d.motivation };
    const json = JSON.stringify(record, null, 2);
    const rows: [string, string][] = [
      ["Reference", ref],
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Program", d.program],
      ["Semester", d.semester],
      ["Departments", deptNames.join(", ")],
      ["Skills", d.skills || "—"],
      ["Motivation", d.motivation],
    ];
    const result = await submitStaticForm(
      "membership",
      { ref, submittedAt, name: d.name, email: d.email, phone: d.phone, program: d.program, semester: d.semester, departments: d.departments.join(", "), departmentNames: deptNames.join(", "), skills: d.skills ?? "", motivation: d.motivation },
      { subject: `Membership application ${ref} — ${d.name}`, body: `${mailBody(rows)}\n\nI confirm I am a student in good standing and agree to the Club Constitution and Code of Conduct.\n\n--- Application data for the committee tool (do not edit) ---\n${json}` }
    );
    setPending(false);
    if (!result.ok) return setMessage({ ok: false, text: result.message });
    saveMyApplication({ ref, name: d.name, email: d.email, submittedAt, delivered: result.via });
    setLastJson({ ref, json });
    if (result.via === "endpoint") return router.push("/membership/submitted");
    setMessage({ ok: true, text: `Your email app has opened with the application filled in. Press send to deliver it to the Executive Committee. Your reference is ${ref}.` });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-7" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {!hasDeliveryChannel && (
        <p className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300" role="status">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden /> Online submissions are being set up. Until then, please reach the Executive Committee at the college in person.
        </p>
      )}
      <ol className="grid grid-cols-1 gap-2 rounded-2xl border border-border/80 bg-muted/40 p-3 text-xs text-muted-foreground sm:grid-cols-3">
        {[["1", "Fill in the form", "About three minutes. You get a reference number instantly."], ["2", "Committee review", "The Executive Committee reviews every application after each intake."], ["3", "Status & card", "Check your status with the reference; approved members get a Member ID and digital card."]].map(([n, t, d]) => (
          <li key={n} className="flex gap-2.5 rounded-xl bg-card px-3 py-2.5">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">{n}</span>
            <span><span className="block font-medium text-foreground">{t}</span>{d}</span>
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
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white", d.color)}><DepartmentIcon icon={d.icon} className="size-4" /></span>
                <span className="min-w-0"><span className="block text-sm font-medium">{d.name}</span><span className="block truncate text-xs text-muted-foreground">{d.tagline}</span></span>
                <span className={cn("ml-auto size-5 shrink-0 rounded-full border-2", on ? "border-primary bg-primary" : "border-border")} aria-hidden>{on && <CheckCircle2 className="size-full text-primary-foreground" />}</span>
              </label>
            );
          })}
        </div>
        {err("departments") && <p className="mt-2 text-xs text-destructive" role="alert">{err("departments")}</p>}
      </fieldset>

      <Field label="Why do you want to join, and what would you love to build?" id="motivation" error={err("motivation")}>
        <textarea id="motivation" name="motivation" required rows={5} placeholder="No experience needed. Curiosity counts." className={cn(field, "h-auto py-3")} aria-invalid={Boolean(err("motivation"))} />
      </Field>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="agree" className="mt-1 size-4 rounded border-border accent-[var(--primary)]" />
        <span>I am a student enrolled in good standing at Tech AI College of Management &amp; Law, and I agree to the Club <a href="/constitution" className="text-primary underline underline-offset-4">Constitution</a> and Code of Conduct.</span>
      </label>
      {err("agree") && <p className="-mt-4 text-xs text-destructive" role="alert">{err("agree")}</p>}

      {message && (
        <div className={cn("space-y-3 rounded-xl px-4 py-3 text-sm", message.ok ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-destructive/10 text-destructive")} role={message.ok ? "status" : "alert"}>
          <p className="flex items-center gap-2">{message.ok ? <CheckCircle2 className="size-4 shrink-0" aria-hidden /> : <AlertCircle className="size-4 shrink-0" aria-hidden />} {message.text}</p>
          {message.ok && lastJson && (
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => downloadText(`${lastJson.ref}.json`, lastJson.json)} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-emerald-600/40 bg-background px-3.5 text-xs font-medium text-foreground hover:bg-muted"><Download className="size-3.5" aria-hidden /> Download a copy of your application</button>
              <a href={`/membership/status/?ref=${lastJson.ref}`} className="inline-flex h-9 items-center rounded-full bg-primary px-3.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Check status later →</a>
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Mail className="size-4" aria-hidden />} Submit application
        </button>
        <p className="text-xs text-muted-foreground">You receive a reference number instantly. The Executive Committee reviews applications after each intake and replies by email.</p>
      </div>
    </form>
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
