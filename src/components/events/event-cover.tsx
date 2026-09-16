import type { ClubEvent, EventType } from "@/data/events";
import { Photo } from "@/components/shared/photo";
import { cn } from "@/lib/utils";

/**
 * The top of an event card. A photograph when one fits the session; otherwise a
 * bold typographic cover (format word + date stamp), never a drawn scene.
 */
const cover: Record<EventType, { word: string; surface: string }> = {
  Meeting: { word: "Welcome", surface: "from-brand-navy via-brand-blue-deep to-brand-blue" },
  Discussion: { word: "Your say", surface: "from-brand-blue-deep via-brand-blue to-brand-blue-light" },
  Workshop: { word: "Hands-on", surface: "from-brand-navy via-brand-blue-deep to-brand-blue-light" },
  "Innovation Week": { word: "5 days", surface: "from-brand-navy via-brand-blue to-brand-coral" },
  "Career Talk": { word: "Careers", surface: "from-brand-navy via-brand-blue-deep to-brand-blue" },
  Hackathon: { word: "24h", surface: "from-brand-coral via-brand-rose to-brand-blue-deep" },
  "Innovation Challenge": { word: "Impact", surface: "from-brand-blue-deep via-brand-blue to-brand-coral" },
  "Project Exhibition": { word: "Showcase", surface: "from-brand-ink via-brand-navy to-brand-rose" },
  Bootcamp: { word: "Build", surface: "from-brand-navy via-brand-blue-deep to-brand-coral" },
};

function stamp(iso: string) {
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "Asia/Kathmandu" }).format(d);
  const month = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "Asia/Kathmandu" }).format(d).toUpperCase();
  return { day, month };
}

export function EventCover({ event: e, className, sizes }: { event: ClubEvent; className?: string; sizes?: string }) {
  if (e.photo) return <Photo name={e.photo} className={cn("absolute inset-0", className)} sizes={sizes} />;
  const c = cover[e.type];
  const { day, month } = stamp(e.date);
  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-gradient-to-br text-white", c.surface, className)} aria-hidden>
      <div className="absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="absolute right-4 top-4 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1.5 text-center backdrop-blur">
        <span className="block font-display text-xl font-semibold leading-none">{day}</span>
        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.2em] text-white/75">{month}</span>
      </div>
      <p className={cn("absolute bottom-3 left-5 font-display font-semibold leading-none tracking-tight transition-transform duration-700 ease-out group-hover:translate-x-1", c.word.length <= 4 ? "text-6xl" : "text-5xl")}>{c.word}</p>
    </div>
  );
}
