"use client";

import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { findPublishedMember, isMemberId, normalizeId, verifyUrl, type RegistryMember } from "@/lib/registry";
import { loadStore } from "@/lib/club-store";
import { loadMyMemberId, saveMyMemberId } from "@/lib/my-application";
import { LookupBox } from "./lookup-box";
import { CardStudio } from "./card-studio";
import { EmptyState } from "@/components/shared/empty-state";
import type { CardData } from "@/lib/card-canvas";

export function CardPage() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<{ member: RegistryMember; source: "published" | "local" } | "missing" | null>(null);

  const lookup = (raw: string) => {
    const id = normalizeId(raw);
    if (!isMemberId(id)) return setState("missing");
    const published = findPublishedMember(id);
    if (published) {
      saveMyMemberId(id);
      return setState({ member: published, source: "published" });
    }
    const local = loadStore().members.find((m) => m.memberId === id);
    setState(local ? { member: local, source: "local" } : "missing");
  };

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("id") ?? loadMyMemberId();
    if (q) {
      setInput(q);
      lookup(q);
    }
  }, []);

  const data: CardData | null = state && state !== "missing" ? { name: state.member.name, memberId: state.member.memberId, position: state.member.position, departments: state.member.departments, program: state.member.program, status: state.member.status, joinedOn: state.member.joinedOn, validUntil: state.member.validUntil, verifyUrl: verifyUrl(state.member.memberId) } : null;

  return (
    <div className="space-y-6">
      <LookupBox label="Member ID" placeholder="TAIC-2026-0001" value={input} onChange={setInput} onSubmit={() => lookup(input)} hint="Your card is generated on your device from the published member registry." buttonLabel="Generate card" />
      {state === "missing" && <EmptyState icon={Info} title="No member with that ID" description="Cards are available for members in the published registry. If you were approved recently, wait for the next registry update or ask the committee to generate your card from the committee tool." action={{ label: "Check application status", href: "/membership/status" }} />}
      {data && state !== "missing" && state?.source === "local" && <p className="rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">This member exists only in this browser&apos;s committee data. The QR code will verify once the registry is published.</p>}
      {data && <CardStudio data={data} />}
    </div>
  );
}
