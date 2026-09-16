import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { committeeWithPhotos } from "@/lib/team-photos";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { PortraitPlaceholder } from "@/components/shared/mini-art";
import { MemberSocials } from "@/components/shared/member-socials";

const featuredIds = ["bikash-kadayat", "sadikshya-rijal", "suman-karki"];

/** Portrait-led leadership cards: the person first, name and role over the photo. */
export function Leadership() {
  const committee = committeeWithPhotos();
  const leaders = featuredIds.map((id) => committee.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section className="section" aria-labelledby="leadership-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Leadership" title={<span id="leadership-heading">The people behind the club.</span>} />
          <Link href="/committee" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
            Full committee <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3">
          {leaders.map((m) => (
            <StaggerItem key={m.id} className="relative">
              <Link href={`/committee#${m.id}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-brand-navy shadow-[0_24px_60px_-34px_var(--glow-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {m.photo ? (
                  <Image src={m.photo} alt={m.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                ) : (
                  <div className="absolute inset-0"><PortraitPlaceholder /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/10 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{m.shortPosition}</p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">{m.name}</h3>
                </div>
              </Link>
              <MemberSocials socials={m.socials} name={m.name} onDark size="sm" align="end" className="absolute right-4 top-4 rounded-2xl bg-black/40 p-1.5 backdrop-blur-md" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
