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
        <SectionHeading eyebrow="Leadership" align="center" title={<span id="leadership-heading">Student leaders driving innovation.</span>} />
        <Stagger className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {leaders.map((m) => (
            <StaggerItem key={m.id}>
              <Link href={`/committee#${m.id}`} className="group flex h-full flex-col items-center rounded-3xl border border-border/80 bg-card px-6 py-10 text-center card-hover">
                <AvatarInitials name={m.name} photo={m.photo} size={112} className="size-28 rounded-full text-3xl shadow-lg shadow-brand-blue/15 ring-4 ring-background transition-transform duration-500 group-hover:scale-105" />
                <h3 className="mt-6 text-lg font-medium">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{m.shortPosition}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-12 text-center">
          <Link href="/committee" className="group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium transition-colors hover:bg-muted">
            Full committee <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
