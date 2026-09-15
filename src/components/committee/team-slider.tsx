"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, GraduationCap } from "lucide-react";
import { committee, type CommitteeMember } from "@/data/committee";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

export function TeamSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <section className="section" aria-labelledby="team-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Executive Committee"
            title={<span id="team-heading">The people behind the club.</span>}
            description="Six student office-bearers and one faculty mentor form the initial Executive Committee, certified on 13 September 2026."
          />
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll team left" className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted">
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll team right" className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted">
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div ref={ref} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        {committee.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="w-[280px] shrink-0 snap-start sm:w-[300px]"
          >
            <TeamCard member={m} />
          </motion.div>
        ))}
        <div className="w-[280px] shrink-0 snap-start sm:w-[300px]">
          <Link href="/committee" className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 p-6 text-center transition-colors hover:border-primary/50 hover:bg-secondary/40">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
              <ArrowUpRight className="size-6" aria-hidden />
            </span>
            <p className="mt-4 font-semibold">Full committee &amp; roles</p>
            <p className="mt-1 text-sm text-muted-foreground">Responsibilities, term of office and governance.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TeamCard({ member: m, className }: { member: CommitteeMember; className?: string }) {
  return (
    <div id={m.id} className={cn("group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-6 card-hover", className)}>
      <div className={cn("absolute inset-x-0 top-0 h-1", m.isFaculty ? "bg-gradient-to-r from-brand-coral to-brand-rose" : "bg-gradient-to-r from-brand-blue to-brand-blue-light")} aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <AvatarInitials name={m.name} photo={m.photo} size={72} className="size-[72px] shadow-lg shadow-brand-blue/15" />
        {m.isFaculty && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs lg:text-[11px] font-semibold text-accent-foreground">
            <GraduationCap className="size-3.5" aria-hidden /> Faculty
          </span>
        )}
      </div>
      <h3 className="mt-5 text-lg font-semibold">{m.name}</h3>
      <p className="text-sm font-medium text-primary">{m.position}</p>
      <p className="mt-1 text-xs text-muted-foreground">{m.program}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {m.focus.map((f) => (
          <li key={f} className="rounded-full bg-muted px-2.5 py-1 text-xs lg:text-[11px] font-medium text-foreground/75">
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
