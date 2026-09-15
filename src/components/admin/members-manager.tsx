"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { IdCard, FileText, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { useClubStore, type StoredMember } from "@/lib/club-store";
import { nextMemberId, publishedRegistry, defaultValidUntil, today, type MemberStatus } from "@/lib/registry";
import { departments } from "@/data/departments";
import { membership } from "@/data/membership";
import { committee } from "@/data/committee";
import { PageTitle, Panel, StatusBadge, Table, Empty, inputClass, Field } from "@/components/dashboard/ui";
import { formatDate, cn } from "@/lib/utils";

const positions = ["Member", ...committee.filter((m) => !m.isFaculty).map((m) => m.position), "Faculty Advisor / Mentor", "Department Lead", "Assistant Department Lead"];
const memberStatuses: MemberStatus[] = ["ACTIVE", "INACTIVE", "SUSPENDED"];

const blank = (): Omit<StoredMember, "memberId" | "createdAt"> => ({ name: "", email: "", phone: "", program: "", semester: "", departments: [], position: "Member", status: "ACTIVE", joinedOn: today(), validUntil: defaultValidUntil() });

export function MembersManager() {
  const [store, update, ready] = useClubStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<MemberStatus | "">("");
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState(blank());

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return store.members.filter((m) => (!status || m.status === status) && (!s || [m.name, m.memberId, m.email ?? "", m.program ?? "", m.position].join(" ").toLowerCase().includes(s))).sort((a, b) => a.memberId.localeCompare(b.memberId));
  }, [store.members, q, status]);
  const isPublished = (id: string) => publishedRegistry.members.some((m) => m.memberId === id);

  const startEdit = (m?: StoredMember) => {
    setEditing(m ? m.memberId : "new");
    setDraft(m ? { ...m } : blank());
  };
  const save = () => {
    if (!draft.name.trim()) return;
    update((s) => {
      if (editing === "new") {
        const memberId = nextMemberId([...publishedRegistry.members.map((m) => m.memberId), ...s.members.map((m) => m.memberId)]);
        return { ...s, members: [...s.members, { ...draft, memberId, createdAt: new Date().toISOString() }] };
      }
      return { ...s, members: s.members.map((m) => (m.memberId === editing ? { ...m, ...draft } : m)) };
    });
    setEditing(null);
  };
  const remove = (id: string) => {
    if (!window.confirm(`Remove ${id} from this browser's member list? If it is already published, also republish the registry.`)) return;
    update((s) => ({ ...s, members: s.members.filter((m) => m.memberId !== id) }));
  };
  const toggleDept = (slug: string) => setDraft((d) => ({ ...d, departments: d.departments.includes(slug) ? d.departments.filter((x) => x !== slug) : d.departments.length >= 2 ? d.departments : [...d.departments, slug] }));

  const seedCommittee = () => {
    if (!window.confirm("Add the seven Executive Committee members as the first member records (IDs assigned in committee order)? You can edit them afterwards.")) return;
    update((s) => {
      const existing = [...publishedRegistry.members.map((m) => m.memberId), ...s.members.map((m) => m.memberId)];
      const names = new Set(s.members.map((m) => m.name.toLowerCase()));
      const fresh: StoredMember[] = [];
      for (const c of committee) {
        if (names.has(c.name.toLowerCase())) continue;
        const memberId = nextMemberId([...existing, ...fresh.map((m) => m.memberId)]);
        fresh.push({ memberId, name: c.name, program: c.isFaculty ? "Faculty" : c.program, departments: [], position: c.position, status: "ACTIVE", joinedOn: "2026-09-13", validUntil: defaultValidUntil(new Date("2026-09-13")), createdAt: new Date().toISOString() });
      }
      return { ...s, members: [...s.members, ...fresh] };
    });
  };

  return (
    <>
      <PageTitle
        title="Members"
        description={ready ? `${store.members.length} in this browser · ${publishedRegistry.members.length} published` : "Loading…"}
        action={
          <div className="flex flex-wrap gap-2">
            {store.members.length === 0 && <button type="button" onClick={seedCommittee} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:bg-muted">Add Executive Committee</button>}
            <button type="button" onClick={() => startEdit()} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="size-4" aria-hidden /> Add member</button>
          </div>
        }
      />

      {editing && (
        <Panel title={editing === "new" ? "New member" : `Edit ${editing}`} description="Only name, program, departments, position, status and dates are published. Email and phone stay in this browser." className="mb-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Full name" id="m-name"><input id="m-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={inputClass} /></Field>
            <Field label="Email (private)" id="m-email"><input id="m-email" type="email" value={draft.email ?? ""} onChange={(e) => setDraft({ ...draft, email: e.target.value })} className={inputClass} /></Field>
            <Field label="Phone (private)" id="m-phone"><input id="m-phone" value={draft.phone ?? ""} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} className={inputClass} /></Field>
            <Field label="Program" id="m-program">
              <select id="m-program" value={draft.program ?? ""} onChange={(e) => setDraft({ ...draft, program: e.target.value })} className={inputClass}>
                <option value="">—</option>
                {[...membership.programs, "Faculty", "Staff"].map((p) => (<option key={p} value={p}>{p}</option>))}
              </select>
            </Field>
            <Field label="Position" id="m-position">
              <select id="m-position" value={draft.position} onChange={(e) => setDraft({ ...draft, position: e.target.value })} className={inputClass}>
                {positions.map((p) => (<option key={p} value={p}>{p}</option>))}
              </select>
            </Field>
            <Field label="Status" id="m-status">
              <select id="m-status" value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as MemberStatus })} className={inputClass}>
                {memberStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
            </Field>
            <Field label="Member since" id="m-joined"><input id="m-joined" type="date" value={draft.joinedOn} onChange={(e) => setDraft({ ...draft, joinedOn: e.target.value })} className={inputClass} /></Field>
            <Field label="Valid until" id="m-valid"><input id="m-valid" type="date" value={draft.validUntil} onChange={(e) => setDraft({ ...draft, validUntil: e.target.value })} className={inputClass} /></Field>
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="mb-1.5 text-sm font-medium">Departments (up to two)</p>
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button key={d.slug} type="button" onClick={() => toggleDept(d.slug)} className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", draft.departments.includes(d.slug) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-muted")}>{d.name}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={save} disabled={!draft.name.trim()} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"><Check className="size-4" aria-hidden /> Save</button>
            <button type="button" onClick={() => setEditing(null)} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:bg-muted"><X className="size-4" aria-hidden /> Cancel</button>
          </div>
        </Panel>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID, email, position" className={`${inputClass} max-w-xs`} />
        <select value={status} onChange={(e) => setStatus(e.target.value as MemberStatus | "")} className={`${inputClass} w-auto`}>
          <option value="">All statuses</option>
          {memberStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>
      <Panel>
        {list.length ? (
          <Table head={["Member", "Position", "Departments", "Status", "Validity", "Published", "Actions"]}>
            {list.map((m) => (
              <tr key={m.memberId} className="align-top">
                <td className="px-4 py-3"><p className="font-medium">{m.name}</p><p className="font-mono text-xs text-muted-foreground">{m.memberId}</p></td>
                <td className="px-4 py-3 text-xs">{m.position}{m.program ? ` · ${m.program}` : ""}</td>
                <td className="px-4 py-3 text-xs">{m.departments.map((d) => departments.find((x) => x.slug === d)?.shortName ?? d).join(", ") || "—"}</td>
                <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-4 py-3 text-xs">{formatDate(m.joinedOn)} → {formatDate(m.validUntil)}</td>
                <td className="px-4 py-3 text-xs">{isPublished(m.memberId) ? <span className="text-emerald-600">Published</span> : <span className="text-amber-600">Not yet</span>}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <Link href={`/membership/card/?id=${m.memberId}`} className="inline-flex h-8 items-center gap-1 rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"><IdCard className="size-3.5" aria-hidden /> Card</Link>
                    <Link href={`/admin/letter/?id=${m.memberId}`} className="inline-flex h-8 items-center gap-1 rounded-full border border-border px-3 text-xs font-medium hover:bg-muted"><FileText className="size-3.5" aria-hidden /> Letter</Link>
                    <button type="button" onClick={() => startEdit(m)} className="inline-flex h-8 items-center gap-1 rounded-full border border-border px-3 text-xs font-medium hover:bg-muted"><Pencil className="size-3.5" aria-hidden /> Edit</button>
                    <button type="button" onClick={() => remove(m.memberId)} className="inline-flex h-8 items-center gap-1 rounded-full bg-destructive/10 px-3 text-xs font-medium text-destructive hover:bg-destructive/20"><Trash2 className="size-3.5" aria-hidden /></button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <Empty title={store.members.length ? "No members match" : "No members yet"} text={store.members.length ? "Try another search or status." : "Approve an application, add a member manually, or add the Executive Committee to start the registry."} />
        )}
      </Panel>
    </>
  );
}
