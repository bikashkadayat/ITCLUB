"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, BookOpen, FileText, Info } from "lucide-react";
import { findPublishedMember, isMemberId, normalizeId, publishedRegistry, type RegistryMember } from "@/lib/registry";
import { loadStore } from "@/lib/club-store";
import { loadMyMemberId, saveMyMemberId } from "@/lib/my-application";
import { LookupBox } from "./lookup-box";
import { MemberSummary } from "./member-summary";
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate } from "@/lib/utils";

export function MemberArea() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ member: RegistryMember; source: "published" | "local" } | null | "missing">(null);

  const lookup = (raw: string) => {
    const id = normalizeId(raw);
    if (!isMemberId(id)) return setResult("missing");
    const published = findPublishedMember(id);
    if (published) {
      saveMyMemberId(id);
      return setResult({ member: published, source: "published" });
    }
    const local = loadStore().members.find((m) => m.memberId === id);
    if (local) return setResult({ member: local, source: "local" });
    setResult("missing");
  };

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("id") ?? loadMyMemberId();
    if (q) {
      setInput(q);
      lookup(q);
    }
  }, []);

  return (
    <div className="space-y-6">
      <LookupBox label="Your Member ID" placeholder="TAIC-2026-0001" value={input} onChange={setInput} onSubmit={() => lookup(input)} hint="Printed on your membership card and in your approval email. This is a lookup, not a login: it only shows information that is already on your card." buttonLabel="Open" />
      {result === "missing" && <EmptyState icon={Info} title="No member with that ID in the published registry" description={`Check the ID for typos. If you were approved recently, the registry may not have been republished yet (last published ${formatDate(publishedRegistry.publishedAt)}). Applicants can check their application with the reference number instead.`} action={{ label: "Check application status", href: "/membership/status" }} />}
      {result && result !== "missing" && (
        <>
          <MemberSummary member={result.member} source={result.source} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, title: "Events", text: "Workshops, hackathons and talks. Reserve a seat by email or at the club desk.", href: "/events" },
              { icon: BookOpen, title: "Resources", text: "Founding documents and a learning track for every department.", href: "/resources" },
              { icon: FileText, title: "Constitution", text: "Your rights and responsibilities as a member.", href: "/constitution" },
            ].map((c) => (
              <Link key={c.title} href={c.href} className="rounded-3xl border border-border/80 bg-card p-5 card-hover">
                <c.icon className="size-5 text-primary" aria-hidden />
                <p className="mt-3 font-medium">{c.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
