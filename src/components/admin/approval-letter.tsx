"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { loadStore, type StoredMember } from "@/lib/club-store";
import { findPublishedMember, departmentName, verifyUrl, normalizeId } from "@/lib/registry";
import { siteConfig } from "@/data/site";
import { club } from "@/data/club";
import { committee } from "@/data/committee";
import { formatDate } from "@/lib/utils";
import { Empty } from "@/components/dashboard/ui";

/** Printable membership approval letter (browser print → PDF). */
export function ApprovalLetter() {
  const [member, setMember] = useState<StoredMember | null | undefined>(undefined);
  useEffect(() => {
    const id = normalizeId(new URLSearchParams(window.location.search).get("id") ?? "");
    const local = loadStore().members.find((m) => m.memberId === id);
    const published = findPublishedMember(id);
    setMember(local ?? (published ? { ...published, createdAt: "" } : null));
  }, []);
  if (member === undefined) return null;
  if (!member) return <Empty title="Member not found" text="Open this page from the Members list." action={<Link href="/admin/members" className="text-sm font-medium text-primary">← Members</Link>} />;
  const president = committee.find((m) => m.id === "bikash-kadayat");
  const advisor = committee.find((m) => m.isFaculty);
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 print:hidden">
        <Link href="/admin/members" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" aria-hidden /> Members</Link>
        <button type="button" onClick={() => window.print()} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Printer className="size-4" aria-hidden /> Print / save as PDF</button>
      </div>
      <article className="mx-auto max-w-3xl rounded-3xl border border-border/80 bg-white p-10 text-[15px] leading-relaxed text-neutral-900 shadow-sm print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
        <header className="flex items-center justify-between gap-6 border-b border-neutral-200 pb-6">
          <div className="flex items-center gap-4">
            <Image src={siteConfig.brand.logoMarkSquare} alt="" width={56} height={56} className="size-14" />
            <div>
              <p className="font-display text-xl font-semibold">Tech &amp; AI Innovation Club</p>
              <p className="text-sm text-neutral-600">Tech AI College of Management &amp; Law · New Baneshwor, Kathmandu</p>
            </div>
          </div>
          <Image src={siteConfig.college.logo} alt="" width={120} height={39} className="h-9 w-auto" />
        </header>
        <p className="mt-8 text-sm text-neutral-600">Date: {formatDate(new Date().toISOString())}</p>
        <h1 className="mt-6 font-display text-2xl font-semibold">Membership Approval</h1>
        <p className="mt-4">Dear {member.name},</p>
        <p className="mt-3">We are pleased to inform you that the Executive Committee has approved your application for membership of the Tech &amp; AI Innovation Club. Your membership details are:</p>
        <table className="mt-4 w-full text-sm">
          <tbody>
            {[
              ["Member ID", member.memberId],
              ["Position", member.position],
              ["Department(s)", member.departments.map(departmentName).join(", ") || "—"],
              ["Program", member.program || "—"],
              ["Member since", formatDate(member.joinedOn)],
              ["Valid until", formatDate(member.validUntil)],
              ["Verification", verifyUrl(member.memberId)],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-neutral-100">
                <td className="py-2 pr-4 font-medium text-neutral-600">{k}</td>
                <td className="py-2 font-mono text-[13px]">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5">As a member you may take part in the club&apos;s workshops, projects, events and activities across the six departments, access shared learning resources, and vote in the selection of the Executive Committee. In return we ask you to attend the bi-weekly assemblies, contribute to at least one departmental project cycle per semester, and abide by the Constitution and Code of Conduct.</p>
        <p className="mt-3">Your digital membership card is available at <span className="font-mono text-[13px]">{siteConfig.url}/membership/card</span> using your Member ID.</p>
        <p className="mt-6 italic text-neutral-700">{club.tagline}</p>
        <div className="mt-12 grid grid-cols-2 gap-10 text-sm">
          <div>
            <div className="h-12 border-b border-neutral-400" />
            <p className="mt-2 font-medium">{president?.name ?? "President"}</p>
            <p className="text-neutral-600">President, Tech &amp; AI Innovation Club</p>
          </div>
          <div>
            <div className="h-12 border-b border-neutral-400" />
            <p className="mt-2 font-medium">{advisor?.name ?? "Faculty Advisor"}</p>
            <p className="text-neutral-600">Faculty Advisor / Mentor</p>
          </div>
        </div>
      </article>
    </>
  );
}
