"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert, Info } from "lucide-react";
import { findPublishedMember, isMemberId, normalizeId, publishedRegistry, type RegistryMember } from "@/lib/registry";
import { LookupBox } from "./lookup-box";
import { MemberSummary } from "./member-summary";
import { formatDate } from "@/lib/utils";

/** Public verification: compares a Member ID against the published registry. No private data. */
export function VerifyMember() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<RegistryMember | "missing" | null>(null);

  const verify = (raw: string) => {
    const id = normalizeId(raw);
    if (!isMemberId(id)) return setResult("missing");
    setResult(findPublishedMember(id) ?? "missing");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromPath = window.location.pathname.match(/\/verify\/([^/]+)\/?$/)?.[1];
    const q = params.get("id") ?? (fromPath && fromPath !== "verify" ? decodeURIComponent(fromPath) : null);
    if (q) {
      setInput(q);
      verify(q);
    }
  }, []);

  return (
    <div className="space-y-6">
      <LookupBox label="Member ID" placeholder="TAIC-2026-0001" value={input} onChange={setInput} onSubmit={() => verify(input)} buttonLabel="Verify" hint="Scan the QR code on a membership card, or type the Member ID printed on it." />
      {result === "missing" && (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-5 text-destructive" role="status">
          <ShieldAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div>
            <p className="font-semibold">Not found in the published registry</p>
            <p className="mt-1 text-sm opacity-90">No member with this ID appears in the registry published on {formatDate(publishedRegistry.publishedAt)}. The card may be invalid, or the member may have been approved after the last update.</p>
          </div>
        </div>
      )}
      {result && result !== "missing" && (
        <>
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-800 dark:text-emerald-300" role="status">
            <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <p className="font-semibold">{result.status === "ACTIVE" ? "Verified: active member" : `Listed in the registry: status ${result.status.toLowerCase()}`}</p>
              <p className="mt-1 text-sm opacity-90">Matches the club&apos;s published member registry (updated {formatDate(publishedRegistry.publishedAt)}).</p>
            </div>
          </div>
          <MemberSummary member={result} showLinks={false} />
        </>
      )}
      <p className="flex items-start gap-2 text-xs text-muted-foreground"><Info className="mt-0.5 size-3.5 shrink-0" aria-hidden /> This is a static check against the registry the Executive Committee publishes with the website. It is not a live database lookup, and it shows only information that is printed on the card.</p>
    </div>
  );
}
