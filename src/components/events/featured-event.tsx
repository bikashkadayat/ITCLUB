import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Sparkles, Clock } from "lucide-react";
import { committeeWithPhotos } from "@/lib/team-photos";
import { AvatarInitials } from "@/components/shared/avatar-initials";
import { TopicIcon } from "./topic-icon";
import { cn } from "@/lib/utils";
import type { ClubEvent } from "@/data/events";
import { Countdown } from "@/components/shared/countdown";
import { Reveal } from "@/components/shared/reveal";
import { EventDays } from "./event-days";
import { formatDateRange, formatTimeSpan, spanDays } from "@/lib/utils";
import type { TopicIcon as TopicIconName } from "@/data/events";

/** Orbit illustration: rings, code glyphs and chips, drawn in code (no stock imagery). */
function InnovationOrbit() {
  const chips = [
    { text: "AI", pos: "left-[4%] top-[42%]" },
    { text: "HTML", pos: "left-[18%] top-[10%]" },
    { text: "CSS", pos: "right-[10%] bottom-[16%]" },
    { text: "</>", pos: "right-[6%] top-[14%]" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]" aria-hidden>
      <div className="absolute inset-0 rounded-full border border-white/15" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-white/30 [animation:spin_40s_linear_infinite]" />
      <div className="absolute inset-[24%] rounded-full border border-white/20" />
      <div className="absolute inset-[36%] rounded-full border-2 border-dashed border-brand-coral-light/70 [animation:spin_28s_linear_infinite_reverse]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
        <path d="M50 4 A46 46 0 0 1 96 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="opacity-80" />
        <path d="M4 50 A46 46 0 0 1 24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="opacity-50" />
        <path d="M62 88 A40 40 0 0 0 88 62" stroke="#ff8a8a" strokeWidth="2.5" strokeLinecap="round" className="opacity-80" />
      </svg>
      <div className="absolute inset-[38%] flex flex-col items-center justify-center rounded-full bg-white/10 text-center text-white backdrop-blur">
        <span className="font-display text-2xl font-semibold leading-none sm:text-3xl">Vibe</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">Coding</span>
        <span className="mt-1 font-mono text-sm text-brand-coral-light">&lt;/&gt;</span>
      </div>
      {chips.map((c) => (
        <span key={c.text} className={`hero-float absolute ${c.pos} flex size-14 items-center justify-center rounded-full border border-white/20 bg-brand-ink/70 font-mono text-sm font-semibold text-white shadow-lg backdrop-blur sm:size-16`}>{c.text}</span>
      ))}
    </div>
  );
}

/** Career visual: a winding path with technology, career and innovation icons along it. Drawn in code. */
function CareerPath({ light }: { light: boolean }) {
  const stops: { icon: TopicIconName; pos: string; delay: string }[] = [
    { icon: "Code2", pos: "left-[6%] top-[62%]", delay: "0s" },
    { icon: "ShieldCheck", pos: "left-[26%] top-[26%]", delay: "0.8s" },
    { icon: "BrainCircuit", pos: "left-[46%] top-[58%]", delay: "1.6s" },
    { icon: "Network", pos: "left-[66%] top-[22%]", delay: "2.4s" },
    { icon: "Briefcase", pos: "right-[4%] top-[52%]", delay: "3.2s" },
  ];
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[420px]" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" fill="none">
        <path d="M20 210 C 90 210, 90 110, 150 110 S 210 200, 250 200 S 300 90, 340 90 S 380 170, 392 180" stroke={light ? "url(#careerLight)" : "rgba(255,255,255,0.35)"} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 10" />
        <path d="M20 210 C 90 210, 90 110, 150 110" stroke={light ? "#2027e3" : "#ff8a8a"} strokeWidth="3" strokeLinecap="round" />
        <defs><linearGradient id="careerLight" x1="0" x2="1"><stop stopColor="#2027e3" /><stop offset="1" stopColor="#ff5050" /></linearGradient></defs>
      </svg>
      {stops.map((s) => (
        <span key={s.icon} className={cn("hero-float absolute flex size-14 items-center justify-center rounded-2xl shadow-lg backdrop-blur sm:size-16", s.pos, light ? "border border-border/80 bg-card text-primary" : "border border-white/20 bg-brand-ink/70 text-white")} style={{ animationDelay: s.delay }}>
          <TopicIcon icon={s.icon} className="size-6" />
        </span>
      ))}
      <span className={cn("absolute bottom-[4%] left-[38%] rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]", light ? "bg-secondary text-secondary-foreground" : "bg-white/10 text-white/80")}>Your path</span>
    </div>
  );
}

/** Hackathon visual: a 24-hour ring with hour ticks, a sweeping arc and coding/collaboration icons. Drawn in code. */
function HackathonClock({ light }: { light: boolean }) {
  const ticks = Array.from({ length: 24 }, (_, i) => i);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke={light ? "rgba(32,39,227,0.15)" : "rgba(255,255,255,0.15)"} strokeWidth="1" />
        {ticks.map((i) => { const a = (i / 24) * Math.PI * 2 - Math.PI / 2; const r1 = i % 6 === 0 ? 40 : 43; return <line key={i} x1={50 + Math.cos(a) * r1} y1={50 + Math.sin(a) * r1} x2={50 + Math.cos(a) * 46} y2={50 + Math.sin(a) * 46} stroke={light ? "#2027e3" : "white"} strokeWidth={i % 6 === 0 ? 1.6 : 0.8} strokeOpacity={i % 6 === 0 ? 0.9 : 0.4} strokeLinecap="round" />; })}
        <path d="M50 4 A46 46 0 1 1 17.5 82.5" stroke={light ? "url(#hackGrad)" : "#ff8a8a"} strokeWidth="2.5" strokeLinecap="round" className="[stroke-dasharray:240] [stroke-dashoffset:60]" />
        <circle cx="50" cy="50" r="31" stroke={light ? "rgba(32,39,227,0.25)" : "rgba(255,255,255,0.25)"} strokeWidth="1" strokeDasharray="2 4" className="[transform-origin:center] [animation:spin_36s_linear_infinite]" />
        <defs><linearGradient id="hackGrad" x1="0" x2="1"><stop stopColor="#2027e3" /><stop offset="1" stopColor="#ff5050" /></linearGradient></defs>
      </svg>
      <div className={cn("absolute inset-[34%] flex flex-col items-center justify-center rounded-full text-center backdrop-blur", light ? "bg-secondary text-foreground" : "bg-white/10 text-white")}>
        <span className="font-display text-3xl font-semibold leading-none sm:text-4xl">24h</span>
        <span className={cn("mt-1 text-[10px] font-semibold uppercase tracking-[0.3em]", light ? "text-primary" : "text-brand-coral-light")}>Build</span>
      </div>
      {[{ icon: "Code2", pos: "left-[6%] top-[18%]", delay: "0s" }, { icon: "Zap", pos: "right-[4%] top-[30%]", delay: "1.1s" }, { icon: "Heart", pos: "left-[12%] bottom-[14%]", delay: "2.2s" }, { icon: "GraduationCap", pos: "right-[10%] bottom-[10%]", delay: "3.3s" }].map((c) => (
        <span key={c.icon} className={cn("hero-float absolute flex size-14 items-center justify-center rounded-2xl shadow-lg backdrop-blur sm:size-16", c.pos, light ? "border border-border/80 bg-card text-primary" : "border border-white/20 bg-brand-ink/70 text-white")} style={{ animationDelay: c.delay }}>
          <TopicIcon icon={c.icon as TopicIconName} className="size-6" />
        </span>
      ))}
    </div>
  );
}

/** Impact visual: a globe of nodes with heart/people/leaf/graduation icons orbiting. Drawn in code. */
function ImpactGlobe({ light }: { light: boolean }) {
  const orbit: { icon: TopicIconName; pos: string; delay: string }[] = [
    { icon: "GraduationCap", pos: "left-[8%] top-[16%]", delay: "0s" },
    { icon: "Leaf", pos: "right-[6%] top-[22%]", delay: "1s" },
    { icon: "Accessibility", pos: "left-[10%] bottom-[14%]", delay: "2s" },
    { icon: "Users", pos: "right-[8%] bottom-[12%]", delay: "3s" },
  ];
  const stroke = light ? "rgba(32,39,227,0.35)" : "rgba(255,255,255,0.35)";
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[360px]" aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="34" stroke={stroke} strokeWidth="1" />
        <ellipse cx="50" cy="50" rx="34" ry="12" stroke={stroke} strokeWidth="0.8" />
        <ellipse cx="50" cy="50" rx="12" ry="34" stroke={stroke} strokeWidth="0.8" />
        <path d="M16 50 H84" stroke={stroke} strokeWidth="0.8" />
        <circle cx="50" cy="50" r="46" stroke={light ? "url(#impactGrad)" : "#ff8a8a"} strokeWidth="2" strokeDasharray="3 9" strokeLinecap="round" className="[transform-origin:center] [animation:spin_50s_linear_infinite]" />
        {[[50,16],[84,50],[50,84],[16,50],[74,26],[26,74],[74,74],[26,26]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r={i<4?2.2:1.6} fill={light ? "#2027e3" : "#ffffff"} className="hero-node" style={{ animationDelay: `${i*0.4}s` }} />))}
        <defs><linearGradient id="impactGrad" x1="0" x2="1"><stop stopColor="#2027e3" /><stop offset="1" stopColor="#ff5050" /></linearGradient></defs>
      </svg>
      <div className={cn("absolute inset-[36%] flex items-center justify-center rounded-full backdrop-blur", light ? "bg-secondary text-primary" : "bg-white/10 text-white")}>
        <TopicIcon icon="Heart" className="size-10 sm:size-12" />
      </div>
      {orbit.map((c) => (
        <span key={c.icon} className={cn("hero-float absolute flex size-14 items-center justify-center rounded-2xl shadow-lg backdrop-blur sm:size-16", c.pos, light ? "border border-border/80 bg-card text-primary" : "border border-white/20 bg-brand-ink/70 text-white")} style={{ animationDelay: c.delay }}>
          <TopicIcon icon={c.icon} className="size-6" />
        </span>
      ))}
    </div>
  );
}

/** Exhibition visual: a gallery wall of four framed project tiles (website, app, AI, research). Drawn in code. */
function GalleryWall({ light }: { light: boolean }) {
  const tiles: { icon: TopicIconName; label: string; rot: string; delay: string }[] = [
    { icon: "Code2", label: "Web", rot: "-rotate-3", delay: "0s" },
    { icon: "Smartphone", label: "Mobile", rot: "rotate-2", delay: "1s" },
    { icon: "BrainCircuit", label: "AI", rot: "rotate-1", delay: "2s" },
    { icon: "BookOpen", label: "Research", rot: "-rotate-2", delay: "3s" },
  ];
  return (
    <div className="relative mx-auto grid w-full max-w-[380px] grid-cols-2 gap-4 p-3" aria-hidden>
      <div className={cn("pointer-events-none absolute inset-x-6 top-0 h-px", light ? "bg-border" : "bg-white/20")} />
      {tiles.map((t) => (
        <div key={t.icon} className={cn("hero-float flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border p-4 shadow-lg backdrop-blur", t.rot, light ? "border-border/80 bg-card" : "border-white/15 bg-white/10")} style={{ animationDelay: t.delay }}>
          <span className={cn("flex size-12 items-center justify-center rounded-xl", light ? "bg-gradient-to-br from-brand-blue to-brand-coral text-white" : "bg-white/15 text-white")}><TopicIcon icon={t.icon} className="size-6" /></span>
          <span className={cn("text-xs font-semibold uppercase tracking-[0.2em]", light ? "text-muted-foreground" : "text-white/70")}>{t.label}</span>
          <span className={cn("h-1 w-16 rounded-full", light ? "bg-secondary" : "bg-white/20")} />
        </div>
      ))}
      <span className={cn("absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]", light ? "bg-secondary text-secondary-foreground" : "bg-white/10 text-white/80")}><TopicIcon icon="Trophy" className="size-3.5" /> Showcase</span>
    </div>
  );
}

/** Portfolio visual: a browser window with a profile card, skills, projects and a live badge; GitHub/LinkedIn-style chips around it. Drawn in code. */
function PortfolioSite({ light }: { light: boolean }) {
  const frame = light ? "border-border/80 bg-card" : "border-white/15 bg-white/10";
  const bar = light ? "bg-muted" : "bg-white/15";
  const chips: { icon: TopicIconName; label: string; pos: string; delay: string }[] = [
    { icon: "Code2", label: "GitHub Pages", pos: "-left-2 top-[18%]", delay: "0s" },
    { icon: "User", label: "LinkedIn", pos: "-right-2 top-[42%]", delay: "1.2s" },
    { icon: "FileText", label: "Resume", pos: "left-[6%] -bottom-3", delay: "2.4s" },
  ];
  return (
    <div className="relative mx-auto w-full max-w-[400px] py-6" aria-hidden>
      <div className={cn("hero-float overflow-hidden rounded-2xl border shadow-2xl backdrop-blur", frame)} style={{ animationDuration: "9s" }}>
        <div className={cn("flex items-center gap-1.5 border-b px-3 py-2", light ? "border-border/70" : "border-white/10")}>
          <span className="size-2.5 rounded-full bg-brand-coral/80" /><span className="size-2.5 rounded-full bg-amber-400/80" /><span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className={cn("ml-3 h-4 flex-1 rounded-md text-[10px] leading-4", bar, light ? "text-muted-foreground" : "text-white/60")}>&nbsp;yourname.github.io</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-coral text-white"><TopicIcon icon="User" className="size-5" /></span>
            <div className="flex-1 space-y-1.5"><span className={cn("block h-2.5 w-2/3 rounded", light ? "bg-foreground/80" : "bg-white/80")} /><span className={cn("block h-2 w-1/2 rounded", bar)} /></div>
            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", light ? "bg-emerald-600/15 text-emerald-800" : "bg-emerald-400/20 text-emerald-200")}><span className="size-1.5 rounded-full bg-current" /> Live</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">{["HTML", "CSS", "Responsive", "UI/UX"].map((t) => (<span key={t} className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", light ? "bg-secondary text-secondary-foreground" : "bg-white/15 text-white")}>{t}</span>))}</div>
          <div className="mt-4 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => (<span key={i} className={cn("block aspect-[4/3] rounded-lg", bar)} />))}</div>
        </div>
      </div>
      {chips.map((c) => (
        <span key={c.label} className={cn("hero-float absolute flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3 text-xs font-semibold shadow-lg backdrop-blur", c.pos, light ? "border-border/80 bg-card text-foreground" : "border-white/20 bg-brand-ink/70 text-white")} style={{ animationDelay: c.delay }}>
          <span className={cn("flex size-7 items-center justify-center rounded-full", light ? "bg-secondary text-primary" : "bg-white/15 text-white")}><TopicIcon icon={c.icon} className="size-3.5" /></span>{c.label}
        </span>
      ))}
    </div>
  );
}

export function FeaturedEvent({ event: e, variant = "dark" }: { event: ClubEvent; variant?: "dark" | "light" }) {
  const light = variant === "light";
  const committee = committeeWithPhotos();
  const facilitators = (e.facilitators ?? []).map((f) => ({ ...f, member: committee.find((m) => m.id === f.memberId) })).filter((f) => f.member);
  return (
    <section className="section pb-0" aria-labelledby={`featured-${e.slug}`}>
      <div className="container-x">
        <Reveal>
          <article className={cn("relative overflow-hidden rounded-[2rem] border shadow-[0_40px_120px_-40px_var(--glow-blue)]", light ? "border-border/80 bg-card text-foreground" : "border-brand-blue/30 bg-gradient-to-br from-brand-navy via-brand-blue-deep to-brand-blue text-white")}>
            <div className={cn("pointer-events-none absolute inset-0 bg-grid", light ? "opacity-60 mask-fade-b" : "opacity-10")} aria-hidden />
            <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand-coral/30 blur-3xl float-slow" aria-hidden />
            <div className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-brand-blue-light/30 blur-3xl float-slow" style={{ animationDelay: "3s" }} aria-hidden />
            <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur", light ? "border border-border bg-background text-foreground/80" : "border border-white/20 bg-white/10 text-white/90")}>
                    <Sparkles className="size-3.5" aria-hidden /> Featured · {e.type}
                  </p>
                  <p className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]", light ? "bg-primary text-primary-foreground" : "bg-white text-brand-blue-deep")}>
                    <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-current" /></span> Upcoming
                  </p>
                </div>
                <h2 id={`featured-${e.slug}`} className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">{e.title}</h2>
                {e.tagline && <p className={cn("mt-4 text-lg font-medium sm:text-xl", light ? "text-primary" : "text-brand-coral-light")}>{e.tagline}</p>}
                {e.motto && <p className={cn("mt-1 text-sm italic", light ? "text-muted-foreground" : "text-white/70")}>{e.motto}</p>}
                <p className={cn("mt-4 max-w-xl text-pretty", light ? "text-muted-foreground" : "text-white/80")}>{e.summary.replace(/^Build • Learn • Showcase\. /, "")}</p>
                <dl className={cn("mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm", light ? "text-foreground/80" : "text-white/85")}>
                  <div className="inline-flex items-center gap-2"><CalendarDays className="size-4" aria-hidden /><dt className="sr-only">Dates</dt><dd>{formatDateRange(e.date, e.endDate)} · {spanDays(e.date, e.endDate) > 1 ? `from ${formatTimeSpan(e.date)}` : formatTimeSpan(e.date, e.endDate)}</dd></div>
                  <div className="inline-flex items-center gap-2"><MapPin className="size-4" aria-hidden /><dt className="sr-only">Venue</dt><dd>{e.venue}</dd></div>
                  {e.duration && <div className="inline-flex items-center gap-2"><Clock className="size-4" aria-hidden /><dt className="sr-only">Duration</dt><dd>{e.duration}</dd></div>}
                </dl>
                {facilitators.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-3" aria-label="Facilitators">
                    {facilitators.map((f) => (
                      <li key={f.memberId} className={cn("flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4", light ? "border border-border/80 bg-background" : "border border-white/15 bg-white/10")}>
                        <AvatarInitials name={f.member!.name} photo={f.member!.photo} size={40} className="size-10 rounded-full text-sm" />
                        <span className="min-w-0 text-left">
                          <span className="block text-sm font-semibold leading-tight">{f.member!.name}</span>
                          <span className={cn("block text-[11px]", light ? "text-muted-foreground" : "text-white/65")}>{f.label} · {f.member!.shortPosition}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className={cn("mt-6 text-xs font-semibold uppercase tracking-[0.22em]", light ? "text-muted-foreground" : "text-white/60")}>Starts in</p>
                <Countdown target={e.date} className={cn("mt-3", !light && "[&>div]:border-white/15 [&>div]:bg-white/10 [&_span]:text-white [&_span:last-child]:text-white/60")} />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/events/${e.slug}`} className={cn("inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-colors", light ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white text-brand-blue hover:bg-white/90")}>
                    {e.days ? "See the full programme" : "Event details"} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link href="/membership" className={cn("inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-semibold transition-colors", light ? "border-border bg-background hover:bg-muted" : "border-white/30 text-white hover:bg-white/10")}>
                    Become a Member to take part
                  </Link>
                </div>
              </div>
              <div className="flex items-center lg:col-span-5">
                {e.visual === "career" ? <CareerPath light={light} /> : e.visual === "hackathon" ? <HackathonClock light={light} /> : e.visual === "impact" ? <ImpactGlobe light={light} /> : e.visual === "exhibition" ? <GalleryWall light={light} /> : e.visual === "portfolio" ? <PortfolioSite light={light} /> : <InnovationOrbit />}
              </div>
            </div>
            {e.days && (
              <div className={cn("relative border-t px-7 py-6 sm:px-10 lg:px-14", light ? "border-border/70" : "border-white/10")}>
                <EventDays days={e.days} light={light} />
              </div>
            )}
            {!e.days && e.topics && (
              <ul className={cn("relative grid grid-cols-1 gap-2 border-t px-7 py-6 sm:px-10 lg:px-14", e.topics.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-5", light ? "border-border/70" : "border-white/10")} aria-label={e.topicsLabel ?? "Topics covered"}>
                {e.topics.map((t) => (
                  <li key={t.title} className={cn("flex items-center gap-3 rounded-2xl px-3.5 py-3", light ? "border border-border/80 bg-background" : "border border-white/15 bg-white/10")}>
                    <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl", light ? "bg-gradient-to-br from-brand-blue to-brand-coral text-white" : "bg-white/15 text-white")}><TopicIcon icon={t.icon} className="size-4" /></span>
                    <span className="text-sm font-medium leading-snug">{t.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
