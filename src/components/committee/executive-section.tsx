import Image from "next/image";
import { Crown, GraduationCap, Check } from "lucide-react";
import { leadershipTagline, type CommitteeMember } from "@/data/committee";
import { committeeWithPhotos } from "@/lib/team-photos";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { LinkedinIcon } from "@/components/shared/brand-icons";
import { cn, initials } from "@/lib/utils";

export function ExecutiveSection() {
  const committee = committeeWithPhotos();
  const president = committee.find((m) => m.id === "bikash-kadayat")!;
  const advisor = committee.find((m) => m.isFaculty)!;
  const officers = committee.filter((m) => m.id !== president.id && !m.isFaculty);

  return (
    <section className="section relative overflow-hidden" aria-labelledby="exec-heading">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-50" aria-hidden />
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow-blue), transparent)" }} aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(closest-side, var(--glow-coral), transparent)" }} aria-hidden />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-6 bg-primary/60" aria-hidden /> Executive Committee <span className="h-px w-6 bg-primary/60" aria-hidden />
          </p>
          <h2 id="exec-heading" className="mt-4 text-balance text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            Leadership that shows up for every member
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{leadershipTagline}</p>
        </Reveal>

        {/* President — featured */}
        <Reveal className="mt-14">
          <ProfileCard member={president} variant="president" />
        </Reveal>

        {/* Officers */}
        <Stagger className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {officers.map((m) => (
            <StaggerItem key={m.id}>
              <ProfileCard member={m} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Faculty advisor — distinguished */}
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
    <div className={cn("relative flex items-center justify-center rounded-full", className)} style={{ width: size, height: size }} aria-hidden>
      <div className="absolute inset-0 rounded-full border border-dashed border-current opacity-40" />
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-coral opacity-90" />
      <span className="relative font-display text-2xl font-medium text-white">{initials(m.name)}</span>
    </div>
  );
}

function ProfileCard({ member: m, variant = "officer" }: { member: CommitteeMember; variant?: "president" | "officer" | "advisor" }) {
  const featured = variant !== "officer";
  return (
    <article
      id={m.id}
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.75rem] border transition-all duration-500 hover:-translate-y-1.5",
        "glass border-border/70 shadow-[0_20px_60px_-30px_var(--glow-blue)] hover:shadow-[0_30px_80px_-30px_var(--glow-blue)]",
        variant === "president" && "border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-[1.75rem] before:bg-gradient-to-r before:from-brand-blue before:via-brand-blue-light before:to-brand-coral before:p-px",
        variant === "advisor" && "border-brand-coral/40 hover:shadow-[0_30px_80px_-30px_var(--glow-coral)]"
      )}
    >
      {variant === "president" && <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-brand-blue/40" aria-hidden />}
      {variant === "president" && <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand-blue/15 blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden />}
      {variant === "advisor" && <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-brand-coral/15 blur-3xl transition-transform duration-700 group-hover:scale-125" aria-hidden />}

      <div className={cn("relative p-6 sm:p-8", featured && "lg:grid lg:grid-cols-12 lg:gap-10")}>
        <div className={cn("flex items-start gap-5", featured && "lg:col-span-5 lg:flex-col lg:items-start")}>
          <div className="relative shrink-0">
            <Avatar member={m} size={featured ? 112 : 84} className={cn("text-foreground shadow-lg", variant === "president" ? "shadow-brand-blue/25" : variant === "advisor" ? "shadow-brand-coral/25" : "shadow-brand-blue/10")} />
            {variant === "president" && (
              <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-brand-blue text-white shadow" title="Founding President">
                <Crown className="size-4" aria-hidden />
              </span>
            )}
            {variant === "advisor" && (
              <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-brand-coral text-white shadow" title="Faculty">
                <GraduationCap className="size-4" aria-hidden />
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className={cn("text-[11px] font-semibold uppercase tracking-[0.22em]", variant === "advisor" ? "text-brand-coral" : "text-primary")}>
              {variant === "president" ? "Founding President" : variant === "advisor" ? "Faculty Advisor / Mentor" : m.position}
            </p>
            <h3 className={cn("mt-1 font-medium", featured ? "text-2xl sm:text-3xl" : "text-xl")}>{m.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.program}</p>
            {m.linkedin && (
              <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background px-3.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary">
                <LinkedinIcon className="size-3.5" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className={cn("mt-6", featured && "lg:col-span-7 lg:mt-0")}>
          <p className="text-pretty text-[15px] leading-relaxed text-foreground/85">{m.bio}</p>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Key responsibilities</p>
          <ul className={cn("mt-3 grid gap-2", featured && "sm:grid-cols-2")}>
            {m.duties.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm leading-snug text-foreground/85">
                <Check className={cn("mt-0.5 size-4 shrink-0", variant === "advisor" ? "text-brand-coral" : "text-primary")} aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
