import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { committeeWithPhotos } from "@/lib/team-photos";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { AvatarInitials } from "@/components/shared/avatar-initials";

const featuredIds = ["bikash-kadayat", "sadikshya-rijal", "suman-karki"];

export function Leadership() {
  const committee = committeeWithPhotos();
  const leaders = featuredIds.map((id) => committee.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section className="section" aria-labelledby="leadership-heading">
      <div className="container-x">
        <SectionHeading
          eyebrow="Leadership"
          align="center"
          title={<span id="leadership-heading">Student Leaders Driving Innovation</span>}
          description="The Tech & AI Innovation Club is led by a dedicated team of students and faculty mentors working together to create opportunities for learning, innovation, and professional growth."
        />
        <Stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {leaders.map((m) => (
            <StaggerItem key={m.id}>
              <div className="flex h-full flex-col items-center rounded-3xl border border-border/80 bg-card px-6 py-8 text-center card-hover">
                <AvatarInitials name={m.name} photo={m.photo} size={96} className="size-24 rounded-full text-2xl shadow-lg shadow-brand-blue/15 ring-4 ring-background" />
                <h3 className="mt-5 text-lg font-medium">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{m.shortPosition}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.isFaculty ? "Faculty, Tech AI College" : m.program}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-10 text-center">
          <Link href="/committee" className="group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium transition-colors hover:bg-muted">
            View Full Committee <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
