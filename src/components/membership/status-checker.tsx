"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Info, XCircle, Hourglass } from "lucide-react";
import { findPublishedByRef, findPublishedDecision, isApplicationRef, normalizeId, publishedRegistry } from "@/lib/registry";
import { loadMyApplication, type MyApplication } from "@/lib/my-application";
import { LookupBox } from "./lookup-box";
import { MemberSummary } from "./member-summary";
import { formatDate } from "@/lib/utils";

type Outcome =
  | { kind: "approved"; memberId: string }
  | { kind: "decision"; status: "PENDING" | "WAITLISTED" | "REJECTED"; decidedOn: string }
  | { kind: "submitted"; mine: MyApplication }
  | { kind: "unknown" }
  | { kind: "invalid" };

export function StatusChecker() {
  const [input, setInput] = useState("");
  const [mine, setMine] = useState<MyApplication | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const check = (raw: string, my = mine) => {
    const ref = normalizeId(raw);
    if (!isApplicationRef(ref)) return setOutcome({ kind: "invalid" });
    const member = findPublishedByRef(ref);
    if (member) return setOutcome({ kind: "approved", memberId: member.memberId });
    const decision = findPublishedDecision(ref);
    if (decision) return setOutcome({ kind: "decision", status: decision.status, decidedOn: decision.decidedOn });
    if (my && my.ref === ref) return setOutcome({ kind: "submitted", mine: my });
    setOutcome({ kind: "unknown" });
  };

  useEffect(() => {
    const my = loadMyApplication();
    setMine(my);
    const q = new URLSearchParams(window.location.search).get("ref") ?? my?.ref;
    if (q) {
      setInput(q);
      check(q, my);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs once on mount
  }, []);

  const approvedMember = outcome?.kind === "approved" ? findPublishedByRef(input) : null;

  return (
    <div className="space-y-6">
      <LookupBox label="Application reference" placeholder="TAIC-APP-20260913-AB12" value={input} onChange={setInput} onSubmit={() => check(input)} hint={`Shown when you submitted the form and included in the email you sent. Registry last published ${formatDate(publishedRegistry.publishedAt)}.`} buttonLabel="Check" />

      {outcome?.kind === "invalid" && <Notice icon={Info} tone="muted" title="That does not look like an application reference" text="References look like TAIC-APP-20260913-AB12." />}
      {outcome?.kind === "approved" && approvedMember && (
        <>
          <Notice icon={CheckCircle2} tone="ok" title="Approved" text={`Congratulations! Your membership application has been approved. Your Membership ID is ${outcome.memberId}.`} />
          <MemberSummary member={approvedMember} source="published" />
        </>
      )}
      {outcome?.kind === "decision" && outcome.status === "WAITLISTED" && <Notice icon={Hourglass} tone="warn" title="Waitlisted" text={`Your application was placed on the waitlist on ${formatDate(outcome.decidedOn)}. The committee contacts waitlisted applicants as places open up.`} />}
      {outcome?.kind === "decision" && outcome.status === "REJECTED" && <Notice icon={XCircle} tone="bad" title="Not approved this time" text={`A decision was recorded on ${formatDate(outcome.decidedOn)}. You are welcome to apply again next intake. Write to the committee if you would like feedback.`} />}
      {outcome?.kind === "decision" && outcome.status === "PENDING" && <Notice icon={Clock} tone="muted" title="Under review" text="The committee has received your application and is reviewing it." />}
      {outcome?.kind === "submitted" && <Notice icon={Clock} tone="muted" title="Submitted, awaiting the committee's decision" text={`You submitted this application on ${formatDate(outcome.mine.submittedAt)}${outcome.mine.delivered === "mailto" ? " by email" : ""}. Decisions appear here once the committee publishes the next registry update.`} />}
      {outcome?.kind === "unknown" && <Notice icon={Info} tone="muted" title="No published decision for this reference yet" text="Either the committee has not reviewed it yet, or the registry has not been republished since. If you submitted by email, make sure the email was actually sent." />}

      <div className="rounded-3xl border border-border/80 bg-muted/40 p-5 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">How status updates work</p>
        <p className="mt-1">This site has no live database. The Executive Committee reviews applications in its committee tool and publishes decisions to the site in batches, typically after each intake meeting. Approved members receive an email with their Member ID as well.</p>
        <p className="mt-2">Lost your reference? <Link href="/contact" className="text-primary hover:underline">Contact the committee</Link> with the email address you applied with.</p>
      </div>
    </div>
  );
}

function Notice({ icon: Icon, tone, title, text }: { icon: typeof Info; tone: "ok" | "warn" | "bad" | "muted"; title: string; text: string }) {
  const tones = { ok: "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300", warn: "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300", bad: "border-destructive/30 bg-destructive/10 text-destructive", muted: "border-border bg-card text-foreground" };
  return (
    <div className={`flex items-start gap-3 rounded-2xl border p-5 ${tones[tone]}`} role="status">
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm opacity-90">{text}</p>
      </div>
    </div>
  );
}
