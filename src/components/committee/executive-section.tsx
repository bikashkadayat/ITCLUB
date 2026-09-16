import Image from "next/image";
import { Crown, GraduationCap, ArrowUpRight } from "lucide-react";
import type { CommitteeMember } from "@/data/committee";
import { committeeWithPhotos } from "@/lib/team-photos";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { LinkedinIcon } from "@/components/shared/brand-icons";
import { MemberDialog } from "./member-dialog";
import { PortraitPlaceholder } from "@/components/shared/mini-art";
import { cn } from "@/lib/utils";

/** Photo, name, role, two-line bio. Everything else opens in a modal. */
export function ExecutiveSection() {
  const committee = committeeWithPhotos();
  const president = committee.find((m) => m.id === "bikash-kadayat")!;
  const advisor = committee.find((m) => m.isFaculty)!;
  const officers = committee.filter((m) => m.id !== president.id && !m.isFaculty);

  return (
    <section className="section relative overflow-hidden" aria-labelledby="exec-heading">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full blur-3xl float-slow" style={{ background: "radial-gradient(closest-side, var(--glow-blue), transparent)" }} aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full blur-3xl float-slow" style={{ background: "radial-gradient(closest-side, var(--glow-coral), transparent)", animationDelay: "3s" }} aria-hidden />

      <div className="container-x relative">
        <h2 id="exec-heading" className="sr-only">Executive Committee members</h2>
        <Reveal>
          <ProfileCard member={president} variant="president" />
        </Reveal>
        <Stagger className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {officers.map((m) => (
            <StaggerItem key={m.id}>
              <ProfileCard member={m} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-6">
          <ProfileCard member={advisor} variant="advisor" />
        </Reveal>
      </div>
    </section>
  );
}

function Avatar({ member: m, size = 96, className }: { member: CommitteeMember; size?: number; className?: string }) {
  if (m.photo) {
    return <Image src={m.photo} alt={m.name} width={size} height={size} className={cn("aspect-square rounded-full object-cover ring-4 ring-background", className)} style={{ width: size, height: size }} />;
  }
  return (
    <div className={cn("relative overflow-hidden rounded-full ring-4 ring-background", className)} style={{ width: size, height: size }} aria-hidden>
      <PortraitPlaceholder />
    </div>
  );
}

function ProfileCard({ member: m, variant = "officer" }: { member: CommitteeMember; variant?: "president" | "officer" | "advisor" }) {
  const featured = variant !== "officer";
  const role = variant === "president" ? "Founding President" : variant === "advisor" ? "Faculty Advisor / Mentor" : m.position;
  return (
    <article
      id={m.id}
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-1.5 scroll-mt-28",
        "glass border-border/70 shadow-[0_20px_60px_-30px_var(--glow-blue)] hover:shadow-[0_30px_80px_-30px_var(--glow-blue)]",
        variant === "president" && "border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[1.75rem] before:bg-gradient-to-r before:from-brand-blue before:via-brand-blue-light before:to-brand-coral before:p-px",
        variant === "advisor" && "border-brand-coral/40 hover:shadow-[0_30px_80px_-30px_var(--glow-coral)]"
      )}
    >
      {variant === "president" && <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-blue/15 blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden />}
      {variant === "advisor" && <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-brand-coral/15 blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden />}

      <div className={cn("relative flex flex-col items-center gap-5 p-7 text-center sm:p-8", featured && "sm:flex-row sm:items-center sm:gap-8 sm:text-left lg:p-10")}>
        <div className="relative shrink-0">
          <Avatar member={m} size={featured ? 128 : 96} className={cn("text-foreground shadow-lg transition-transform duration-500 group-hover:scale-105", variant === "president" ? "shadow-brand-blue/25" : variant === "advisor" ? "shadow-brand-coral/25" : "shadow-brand-blue/10")} />
          {variant === "president" && <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-brand-blue text-white shadow" title="Founding President"><Crown className="size-4" aria-hidden /></span>}
          {variant === "advisor" && <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-brand-coral text-white shadow" title="Faculty"><GraduationCap className="size-4" aria-hidden /></span>}
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn("text-xs lg:text-[11px] font-semibold uppercase tracking-[0.22em]", variant === "advisor" ? "text-brand-coral" : "text-primary")}>{role}</p>
          <h3 className={cn("mt-1 font-medium", featured ? "text-2xl sm:text-3xl" : "text-xl")}>{m.name}</h3>
          <p className={cn("mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground", featured && "max-w-xl")}>{m.bio}</p>
          <div className={cn("mt-5 flex flex-wrap items-center justify-center gap-2", featured && "sm:justify-start")}>
            <MemberDialog member={m} className="inline-flex h-11 items-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium sm:h-9 sm:px-4 sm:text-xs text-primary-foreground transition-colors hover:bg-primary/90">
              Full profile <ArrowUpRight className="size-3.5" aria-hidden />
            </MemberDialog>
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-3.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary">
                <LinkedinIcon className="size-3.5" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
