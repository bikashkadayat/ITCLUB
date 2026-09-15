"use client";

import Link from "next/link";
import { Inbox, Users, UserCheck, Upload, ArrowRight, BookOpen } from "lucide-react";
import { useClubStore } from "@/lib/club-store";
import { publishedRegistry } from "@/lib/registry";
import { PageTitle, StatCard, Panel } from "@/components/dashboard/ui";
import { formatDate } from "@/lib/utils";

export function AdminOverview() {
  const [store, , ready] = useClubStore();
  const pending = store.applications.filter((a) => a.status === "PENDING").length;
  const active = store.members.filter((m) => m.status === "ACTIVE").length;
  const unpublished = store.members.filter((m) => !publishedRegistry.members.some((p) => p.memberId === m.memberId)).length;
  return (
    <>
      <PageTitle title="Overview" description={ready ? `Local data updated ${store.updatedAt.startsWith("1970") ? "never" : formatDate(store.updatedAt)} · registry published ${formatDate(publishedRegistry.publishedAt)}` : "Loading local data…"} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending applications" value={pending} hint="waiting for a decision" icon={Inbox} tone="coral" href="/admin/applications?status=PENDING" />
        <StatCard label="Members (local)" value={store.members.length} hint={`${active} active`} icon={Users} href="/admin/members" />
        <StatCard label="Published members" value={publishedRegistry.members.length} hint="in src/data/registry.json" icon={UserCheck} tone="neutral" />
        <StatCard label="Not yet published" value={unpublished} hint="export the registry and deploy" icon={Upload} tone={unpublished ? "coral" : "neutral"} href="/admin/data" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="How the workflow runs" description="No server: applications travel as files or emails, decisions are published with the website.">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-foreground/85">
            <li><strong>Collect.</strong> Applications arrive by email (with a JSON block at the bottom) or in your form service. Copy the JSON, or save the attachment, then <Link href="/admin/applications" className="text-primary underline underline-offset-4">import it</Link>.</li>
            <li><strong>Review.</strong> Search, read the motivation, add notes, then Approve, Waitlist or Reject. Approving assigns the next Member ID (TAIC-{new Date().getFullYear()}-0001, 0002…).</li>
            <li><strong>Generate cards.</strong> Open a member and click Membership card to download the PNG or PDF, or print the approval letter.</li>
            <li><strong>Publish.</strong> In <Link href="/admin/data" className="text-primary underline underline-offset-4">Data &amp; publishing</Link>, export the public registry and commit it as <code className="font-mono text-xs">src/data/registry.json</code>. GitHub Pages rebuilds; the member area, status page, cards and QR verification now recognise the new members.</li>
            <li><strong>Back up.</strong> Export the private backup after every session and keep it somewhere safe (it contains emails and phone numbers).</li>
          </ol>
        </Panel>
        <Panel title="Quick actions">
          <div className="grid gap-2">
            {[
              { href: "/admin/applications", label: "Import or review applications", icon: Inbox },
              { href: "/admin/members", label: "Members, cards and approval letters", icon: Users },
              { href: "/admin/data", label: "Export registry, backup, CSV", icon: BookOpen },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="flex items-center justify-between rounded-xl border border-border/80 bg-background px-4 py-3 text-sm font-medium hover:bg-muted">
                <span className="inline-flex items-center gap-2"><a.icon className="size-4 text-primary" aria-hidden /> {a.label}</span>
                <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
