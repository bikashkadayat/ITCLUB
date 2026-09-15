"use client";

/** Full profile in a modal: bio, key responsibilities, formal responsibilities and focus areas. */
import { Check } from "lucide-react";
import type { CommitteeMember } from "@/data/committee";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function MemberDialog({ member: m, className, children }: { member: CommitteeMember; className?: string; children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{m.name}</DialogTitle>
          <DialogDescription>{m.position} · {m.isFaculty ? "Faculty, Tech AI College" : m.program}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 px-4 pb-6 text-sm">
          <p className="text-pretty leading-relaxed text-foreground/90">{m.bio}</p>
          <div>
            <p className="text-xs lg:text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Key responsibilities</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {m.duties.map((d) => (
                <li key={d} className="flex gap-2.5 leading-snug text-foreground/85">
                  <Check className={cn("mt-0.5 size-4 shrink-0", m.isFaculty ? "text-brand-coral" : "text-primary")} aria-hidden /> {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs lg:text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Under the Constitution</p>
            <p className="mt-2 leading-relaxed text-foreground/85">{m.responsibilities}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {m.focus.map((f) => (
              <li key={f} className="rounded-full bg-muted px-3 py-1 text-xs">{f}</li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
