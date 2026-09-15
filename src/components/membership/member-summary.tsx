import Link from "next/link";
import { BadgeCheck, IdCard, ShieldCheck } from "lucide-react";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { departmentName, type RegistryMember } from "@/lib/registry";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statusStyle: Record<RegistryMember["status"], string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  INACTIVE: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  SUSPENDED: "bg-destructive/10 text-destructive",
};

/** Public-safe member details (exactly what the card shows). */
export function MemberSummary({ member, source, showLinks = true }: { member: RegistryMember; source?: "published" | "local"; showLinks?: boolean }) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <AvatarInitials name={member.name} size={80} className="size-20 rounded-full text-2xl" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{member.position}</p>
          <h2 className="mt-1 text-2xl font-medium">{member.name}</h2>
          <p className="mt-1 font-mono text-sm tracking-wider text-muted-foreground">{member.memberId}</p>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", statusStyle[member.status])}>
          <BadgeCheck className="size-3.5" aria-hidden /> {member.status.toLowerCase()}
        </span>
      </div>
      <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Department", member.departments.map(departmentName).join(", ") || "—"],
          ["Program", member.program || "—"],
          ["Member since", formatDate(member.joinedOn)],
          ["Valid until", formatDate(member.validUntil)],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs uppercase tracking-wider text-muted-foreground">{k}</dt>
            <dd className="mt-1 font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      {source === "local" && <p className="mt-4 rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-800 dark:text-amber-300">Found in this browser&apos;s committee data. It is not in the published registry yet, so the public verification page will not show it until the registry is exported and deployed.</p>}
      {showLinks && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={`/membership/card/?id=${member.memberId}`} className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"><IdCard className="size-4" aria-hidden /> Membership card</Link>
          <Link href={`/verify/?id=${member.memberId}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-muted"><ShieldCheck className="size-4 text-primary" aria-hidden /> Verification page</Link>
        </div>
      )}
    </div>
  );
}
