"use client";

import { useState } from "react";
import { Download, Upload, Globe, Lock, Table2, Trash2, GitBranch } from "lucide-react";
import { useClubStore, parseBackup, toPublicRegistry, toCsv, downloadText, STORE_KEY, applicationDepartmentNames } from "@/lib/club-store";
import { publishedRegistry } from "@/lib/registry";
import { PageTitle, Panel } from "@/components/dashboard/ui";
import { formatDate } from "@/lib/utils";

export function DataManager() {
  const [store, update, ready] = useClubStore();
  const [notice, setNotice] = useState<string | null>(null);
  const stamp = new Date().toISOString().slice(0, 10);

  const exportRegistry = () => {
    const reg = toPublicRegistry(store);
    downloadText("registry.json", JSON.stringify(reg, null, 2));
    setNotice(`registry.json exported with ${reg.members.length} members and ${reg.decisions.length} decisions. Commit it as src/data/registry.json and push to main.`);
  };
  const exportBackup = () => {
    downloadText(`taic-committee-backup-${stamp}.json`, JSON.stringify(store, null, 2));
    setNotice("Private backup exported. It contains emails, phone numbers and notes: store it securely, never commit it to the repository.");
  };
  const exportCsv = (kind: "applications" | "members") => {
    const rows = kind === "applications" ? store.applications.map((a) => ({ ref: a.ref, status: a.status, name: a.name, email: a.email, phone: a.phone, program: a.program, semester: a.semester, departments: applicationDepartmentNames(a), skills: a.skills, submittedAt: a.submittedAt, reviewedAt: a.reviewedAt ?? "", memberId: a.memberId ?? "", notes: a.notes ?? "" })) : store.members.map((m) => ({ memberId: m.memberId, name: m.name, position: m.position, status: m.status, program: m.program ?? "", departments: m.departments, joinedOn: m.joinedOn, validUntil: m.validUntil, email: m.email ?? "", phone: m.phone ?? "" }));
    downloadText(`taic-${kind}-${stamp}.csv`, toCsv(rows), "text/csv");
  };
  const importBackup = async (files: FileList | null) => {
    if (!files?.length) return;
    const { applications, members } = parseBackup(await files[0].text());
    if (!applications.length && !members.length) return setNotice("Nothing recognised in that file.");
    const mode = window.confirm("Merge with the data already in this browser? (Cancel = replace everything with the file.)");
    update((s) => {
      if (!mode) return { ...s, applications, members };
      const refs = new Set(s.applications.map((a) => a.ref));
      const ids = new Set(s.members.map((m) => m.memberId));
      return { ...s, applications: [...s.applications, ...applications.filter((a) => !refs.has(a.ref))], members: [...s.members, ...members.filter((m) => !ids.has(m.memberId))] };
    });
    setNotice(`${mode ? "Merged" : "Replaced with"} ${applications.length} applications and ${members.length} members.`);
  };
  const importPublished = () => {
    if (!window.confirm("Add every member from the published registry that is missing from this browser?")) return;
    update((s) => {
      const ids = new Set(s.members.map((m) => m.memberId));
      return { ...s, members: [...s.members, ...publishedRegistry.members.filter((m) => !ids.has(m.memberId)).map((m) => ({ ...m, createdAt: new Date().toISOString() }))] };
    });
  };
  const reset = () => {
    if (!window.confirm("Delete ALL applications and members stored in this browser? Export a backup first.")) return;
    localStorage.removeItem(STORE_KEY);
    window.dispatchEvent(new Event("taic-store"));
    setNotice("Local data cleared.");
  };

  const btn = "inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors";
  return (
    <>
      <PageTitle title="Data & publishing" description={ready ? `${store.applications.length} applications · ${store.members.length} members in this browser · registry published ${formatDate(publishedRegistry.publishedAt)}` : "Loading…"} />
      {notice && <p className="mb-4 rounded-xl bg-secondary/60 px-4 py-3 text-sm" role="status">{notice}</p>}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Publish the member registry" description="Public file that powers the member area, status page, cards and QR verification.">
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-foreground/85">
            <li>Export <code className="font-mono text-xs">registry.json</code> below.</li>
            <li>Replace <code className="font-mono text-xs">src/data/registry.json</code> in the GitHub repository with it (GitHub web editor: open the file → edit → paste → commit to <code className="font-mono text-xs">main</code>).</li>
            <li>GitHub Pages rebuilds in about three minutes. Members can then look themselves up and QR codes verify.</li>
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">Published fields only: Member ID, reference, name, program, departments, position, status, dates. Waitlist / rejection decisions are published as reference + status, without names.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={exportRegistry} className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}><Globe className="size-4" aria-hidden /> Export registry.json</button>
            <button type="button" onClick={importPublished} className={`${btn} border border-border bg-card hover:bg-muted`}><GitBranch className="size-4 text-primary" aria-hidden /> Pull published members into this browser</button>
          </div>
        </Panel>
        <Panel title="Private backup" description="Everything in this browser, including emails, phones and notes.">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={exportBackup} className={`${btn} bg-primary text-primary-foreground hover:bg-primary/90`}><Lock className="size-4" aria-hidden /> Export backup</button>
            <label className={`${btn} cursor-pointer border border-border bg-card hover:bg-muted`}><Upload className="size-4 text-primary" aria-hidden /> Import backup<input type="file" accept=".json,application/json" className="sr-only" onChange={(e) => importBackup(e.target.files)} /></label>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Use the backup to move the committee tool to another device or to hand over to the next committee. Never commit it to the repository.</p>
        </Panel>
        <Panel title="Spreadsheets" description="CSV exports for meetings and records.">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => exportCsv("applications")} className={`${btn} border border-border bg-card hover:bg-muted`}><Table2 className="size-4 text-primary" aria-hidden /> Applications CSV</button>
            <button type="button" onClick={() => exportCsv("members")} className={`${btn} border border-border bg-card hover:bg-muted`}><Table2 className="size-4 text-primary" aria-hidden /> Members CSV</button>
          </div>
        </Panel>
        <Panel title="Danger zone">
          <button type="button" onClick={reset} className={`${btn} bg-destructive/10 text-destructive hover:bg-destructive/20`}><Trash2 className="size-4" aria-hidden /> Clear all local data</button>
          <p className="mt-3 text-xs text-muted-foreground">Removes applications and members from this browser only. The published registry on the website is unaffected.</p>
        </Panel>
      </div>
      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Download className="size-3.5" aria-hidden /> Downloads are generated in your browser; nothing is sent anywhere.</p>
    </>
  );
}
