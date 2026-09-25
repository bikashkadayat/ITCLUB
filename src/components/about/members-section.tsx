import { Users } from "lucide-react";
import { members, memberCountLabel } from "@/data/members";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";

function initials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Compact member grid: initials, name, program and semester only. */
export function MembersSection() {
  return (
    <section className="section bg-muted/40" aria-labelledby="members-heading">
      <div className="container-x">
        <Reveal className="mb-6 flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Users className="size-4" aria-hidden /> {memberCountLabel} Active Members
          </p>
        </Reveal>
        <SectionHeading
          align="center"
          title={<span id="members-heading">Our Members</span>}
          description="A growing community of students passionate about technology, innovation, and continuous learning."
        />
        <Stagger className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {members.map((m) => (
            <StaggerItem key={m.name}>
              <div className="flex h-full items-center gap-3.5 rounded-2xl border border-border/80 bg-card px-4 py-3.5 transition-colors duration-300 hover:border-primary/25">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary" aria-hidden>
                  {initials(m.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{m.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{[m.program, m.semester].filter(Boolean).join(" • ")}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
