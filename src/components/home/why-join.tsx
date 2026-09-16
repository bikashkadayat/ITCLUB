import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { Photo } from "@/components/shared/photo";
import type { VisualKey } from "@/data/visuals";
import { cn } from "@/lib/utils";

/**
 * Bento layout: photographs where the club has a fitting image, and bold
 * typographic panels built on real facts (a 24-hour hackathon, three faculties)
 * where it does not. No icons and no cartoon scenes.
 */
type Tile =
  | { kind: "photo"; title: string; text: string; photo: VisualKey; span: string }
  | { kind: "type"; title: string; text: string; display: string; tone: "navy" | "coral" | "light"; span: string };

const tiles: Tile[] = [
  { kind: "photo", title: "Real Projects", text: "Build practical solutions for real-world challenges.", photo: "lab", span: "lg:col-span-2" },
  { kind: "photo", title: "Industry Exposure", text: "Learn directly from professionals and mentors.", photo: "datacenterEngineer", span: "" },
  { kind: "type", title: "Leadership", text: "Run a department, lead an event, present to a room.", display: "Lead the room.", tone: "navy", span: "" },
  { kind: "type", title: "Hackathons", text: "Compete, build and innovate as a team.", display: "24h", tone: "coral", span: "" },
  { kind: "photo", title: "Networking", text: "Meet students and professionals across Nepal's tech community.", photo: "nepalNetwork", span: "lg:col-span-2" },
  { kind: "type", title: "Collaboration", text: "Computer science, management and law, working together.", display: "3 faculties. 1 team.", tone: "light", span: "" },
];

const toneClass = {
  navy: "bg-gradient-to-br from-brand-navy via-brand-blue-deep to-brand-blue text-white",
  coral: "bg-gradient-to-br from-brand-coral via-brand-rose to-brand-blue-deep text-white",
  light: "bg-card text-foreground border border-border/80",
};

export function WhyJoin() {
  return (
    <section className="section" aria-labelledby="why-join-heading">
      <div className="container-x">
        <SectionHeading eyebrow="Why join" align="center" title={<span id="why-join-heading">What every member gets.</span>} />
        <Stagger className="mt-12 grid auto-rows-[18rem] grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t) => (
            <StaggerItem key={t.title} className={cn("h-full", t.span)}>
              {t.kind === "photo" ? (
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] bg-brand-navy shadow-[0_24px_60px_-34px_var(--glow-blue)] transition-transform duration-500 hover:-translate-y-1.5">
                  <Photo name={t.photo} fade={false} className="absolute inset-0" sizes="(min-width: 1024px) 50vw, 100vw" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/35 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                    <h3 className="text-2xl font-semibold tracking-tight">{t.title}</h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/80">{t.text}</p>
                  </div>
                </article>
              ) : (
                <article className={cn("group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 shadow-[0_24px_60px_-34px_var(--glow-blue)] transition-transform duration-500 hover:-translate-y-1.5 sm:p-7", toneClass[t.tone])}>
                  {t.tone !== "light" && <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" aria-hidden />}
                  <p className={cn("relative font-display font-semibold leading-[0.95] tracking-tight", t.display.length <= 4 ? "text-7xl sm:text-8xl" : "text-4xl sm:text-[2.6rem]", t.tone === "light" && "gradient-text")}>{t.display}</p>
                  <div className="relative">
                    <h3 className="text-xl font-semibold tracking-tight">{t.title}</h3>
                    <p className={cn("mt-1.5 text-sm leading-relaxed", t.tone === "light" ? "text-muted-foreground" : "text-white/80")}>{t.text}</p>
                  </div>
                </article>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
