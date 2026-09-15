"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Upload, ClipboardPaste, Mail, Phone, GraduationCap, CalendarDays, Trash2, CheckCircle2, IdCard } from "lucide-react";
import { useClubStore, parseApplications, type Application, type ApplicationStatus, type StoredMember, applicationDepartmentNames } from "@/lib/club-store";
import { nextMemberId, publishedRegistry, defaultValidUntil, today } from "@/lib/registry";
import { departments } from "@/data/departments";
import { PageTitle, Panel, StatusBadge, Empty, inputClass, textareaClass } from "@/components/dashboard/ui";
import { formatDate, cn } from "@/lib/utils";

const statuses: ApplicationStatus[] = ["PENDING", "WAITLISTED", "APPROVED", "REJECTED"];
const labels: Record<ApplicationStatus, string> = { PENDING: "Pending", WAITLISTED: "Waitlisted", APPROVED: "Approved", REJECTED: "Rejected" };

export function ApplicationsManager() {
  const [store, update, ready] = useClubStore();
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [paste, setPaste] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("status");
    if (s && statuses.includes(s as ApplicationStatus)) setStatus(s as ApplicationStatus);
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return store.applications
      .filter((a) => (!status || a.status === status) && (!dept || a.departments.includes(dept)) && (!s || [a.name, a.email, a.phone, a.program, a.ref, ...a.skills].join(" ").toLowerCase().includes(s)))
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
  }, [store.applications, status, q, dept]);
  const counts = Object.fromEntries(statuses.map((s) => [s, store.applications.filter((a) => a.status === s).length])) as Record<ApplicationStatus, number>;

  const importText = (text: string, source: string) => {
    const apps = parseApplications(text);
    if (!apps.length) return setNotice(`No applications found in ${source}. Expected the JSON block from an application email, a downloaded .json application, or a backup file.`);
    let added = 0;
    update((s) => {
      const existing = new Set(s.applications.map((a) => a.ref));
      const fresh = apps.filter((a) => !existing.has(a.ref));
      added = fresh.length;
      return { ...s, applications: [...s.applications, ...fresh] };
    });
    setNotice(`${added} new application${added === 1 ? "" : "s"} imported from ${source}${apps.length - added ? ` (${apps.length - added} already present)` : ""}.`);
    setPaste("");
  };
  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const texts = await Promise.all(Array.from(files).map((f) => f.text()));
    importText(`[${texts.map((t) => t.trim()).filter(Boolean).join(",")}]`, `${files.length} file${files.length === 1 ? "" : "s"}`);
  };

  const setAppStatus = (ref: string, next: ApplicationStatus) => {
    update((s) => {
      const app = s.applications.find((a) => a.ref === ref);
      if (!app) return s;
      const reviewedAt = new Date().toISOString();
      if (next === "APPROVED") {
        if (!window.confirm(`Approve ${app.name}? This assigns the next Member ID and creates the member record.`)) return s;
        const memberId = app.memberId ?? nextMemberId([...publishedRegistry.members.map((m) => m.memberId), ...s.members.map((m) => m.memberId)]);
        const member: StoredMember = { memberId, ref: app.ref, name: app.name, email: app.email, phone: app.phone, program: app.program, semester: app.semester, departments: app.departments, position: "Member", status: "ACTIVE", joinedOn: today(), validUntil: defaultValidUntil(), createdAt: reviewedAt };
        return { ...s, applications: s.applications.map((a) => (a.ref === ref ? { ...a, status: next, reviewedAt, memberId } : a)), members: s.members.some((m) => m.memberId === memberId) ? s.members : [...s.members, member] };
      }
      if (next === "REJECTED" && !window.confirm(`Reject ${app.name}'s application?`)) return s;
      return { ...s, applications: s.applications.map((a) => (a.ref === ref ? { ...a, status: next, reviewedAt } : a)) };
    });
  };
  const setNotes = (ref: string, notes: string) => update((s) => ({ ...s, applications: s.applications.map((a) => (a.ref === ref ? { ...a, notes } : a)) }));
  const remove = (ref: string) => {
    if (!window.confirm("Delete this application from this browser? The member record (if approved) stays.")) return;
    update((s) => ({ ...s, applications: s.applications.filter((a) => a.ref !== ref) }));
  };

  return (
    <>
      <PageTitle title="Membership applications" description={ready ? `${store.applications.length} in this browser · ${counts.PENDING} pending` : "Loading…"} />

      <Panel title="Import applications" description="From the JSON block at the bottom of an application email, a downloaded .json file, or your form service's export." className="mb-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm hover:bg-muted">
            <Upload className="size-5 text-primary" aria-hidden />
            <span className="font-medium">Choose .json files</span>
            <span className="text-xs text-muted-foreground">Several at once is fine. Duplicates (same reference) are skipped.</span>
            <input type="file" accept=".json,application/json,.txt" multiple className="sr-only" onChange={(e) => onFiles(e.target.files)} />
          </label>
          <div className="flex flex-col gap-2">
            <textarea value={paste} onChange={(e) => setPaste(e.target.value)} rows={4} placeholder='Paste the email text or JSON here, e.g. {"form":"membership","ref":"TAIC-APP-…", …}' className={textareaClass} />
            <button type="button" onClick={() => importText(paste, "pasted text")} disabled={!paste.trim()} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"><ClipboardPaste className="size-4" aria-hidden /> Import pasted JSON</button>
          </div>
        </div>
        {notice && <p className="mt-3 text-sm text-muted-foreground" role="status">{notice}</p>}
      </Panel>

      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setStatus("")} className={cn("rounded-full border px-3.5 py-1.5 text-xs font-medium", !status ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted")}>All</button>
        {statuses.map((s) => (
          <button key={s} type="button" onClick={() => setStatus(s)} className={cn("rounded-full border px-3.5 py-1.5 text-xs font-medium", status === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted")}>{labels[s]} <span className="opacity-70">{counts[s]}</span></button>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, phone, program, reference or skill" className={`${inputClass} max-w-sm`} />
        <select value={dept} onChange={(e) => setDept(e.target.value)} className={`${inputClass} w-auto`}>
          <option value="">All departments</option>
          {departments.map((d) => (<option key={d.slug} value={d.slug}>{d.name}</option>))}
        </select>
      </div>

      {list.length ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((a) => (
            <li key={a.ref} className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{a.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><GraduationCap className="size-3.5" aria-hidden /> {a.program} · {a.semester} semester</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex items-center gap-2"><Mail className="size-3.5 text-primary" aria-hidden /><dd className="truncate">{a.email}</dd></div>
                <div className="flex items-center gap-2"><Phone className="size-3.5 text-primary" aria-hidden /><dd>{a.phone || "—"}</dd></div>
                <div className="flex items-center gap-2"><CalendarDays className="size-3.5 text-primary" aria-hidden /><dd>{formatDate(a.submittedAt)} · <span className="font-mono text-xs">{a.ref}</span></dd></div>
              </dl>
              <p className="mt-2 text-xs text-muted-foreground">{applicationDepartmentNames(a) || "No department chosen"}</p>
              {a.memberId && <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="size-3.5" aria-hidden /> Member ID {a.memberId}</p>}
              <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
                <button type="button" onClick={() => setOpen(open === a.ref ? null : a.ref)} className="inline-flex h-8 items-center rounded-full border border-border px-3 text-xs font-medium hover:bg-muted">{open === a.ref ? "Hide details" : "Details"}</button>
                <ReviewButtons app={a} onStatus={(s) => setAppStatus(a.ref, s)} />
              </div>
              {open === a.ref && (
                <div className="mt-4 space-y-3 border-t border-border/70 pt-4 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Motivation</p>
                    <p className="mt-1 whitespace-pre-line leading-relaxed">{a.motivation || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Skills</p>
                    <p className="mt-1">{a.skills.join(", ") || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor={`notes-${a.ref}`}>Committee notes (private)</label>
                    <textarea id={`notes-${a.ref}`} defaultValue={a.notes ?? ""} onBlur={(e) => setNotes(a.ref, e.target.value)} rows={3} className={`${textareaClass} mt-1`} placeholder="Saved when you click away" />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {a.memberId && <Link href={`/membership/card/?id=${a.memberId}`} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"><IdCard className="size-3.5" aria-hidden /> Membership card</Link>}
                    <button type="button" onClick={() => remove(a.ref)} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-destructive/10 px-3 text-xs font-medium text-destructive hover:bg-destructive/20"><Trash2 className="size-3.5" aria-hidden /> Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <Empty title={store.applications.length ? "No applications match" : "No applications imported yet"} text={store.applications.length ? "Try another search, department or status." : "Import the JSON from an application email or a downloaded application file above."} />
      )}
    </>
  );
}

function ReviewButtons({ app, onStatus }: { app: Application; onStatus: (s: ApplicationStatus) => void }) {
  const btn = "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors";
  return (
    <>
      {app.status !== "APPROVED" && <button type="button" onClick={() => onStatus("APPROVED")} className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}>Approve &amp; assign ID</button>}
      {app.status !== "WAITLISTED" && app.status !== "APPROVED" && <button type="button" onClick={() => onStatus("WAITLISTED")} className={`${btn} border border-border bg-card hover:bg-muted`}>Waitlist</button>}
      {app.status !== "REJECTED" && app.status !== "APPROVED" && <button type="button" onClick={() => onStatus("REJECTED")} className={`${btn} bg-destructive/10 text-destructive hover:bg-destructive/20`}>Reject</button>}
      {app.status !== "PENDING" && app.status !== "APPROVED" && <button type="button" onClick={() => onStatus("PENDING")} className={`${btn} hover:bg-muted`}>Back to pending</button>}
    </>
  );
}
