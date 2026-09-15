import Image from "next/image";
import { Rocket, BrainCircuit, Code2, ShieldCheck, Trophy } from "lucide-react";

const cards = [
  { icon: Rocket, title: "Innovation Projects", pos: "left-[-6%] top-[8%]", delay: "0s" },
  { icon: BrainCircuit, title: "AI & Data Science", pos: "right-[-8%] top-[18%]", delay: "1.2s" },
  { icon: Code2, title: "Software Development", pos: "left-[-10%] top-[52%]", delay: "2.1s" },
  { icon: ShieldCheck, title: "Cyber Security", pos: "right-[-6%] top-[62%]", delay: "0.6s" },
  { icon: Trophy, title: "Leadership", pos: "left-[14%] bottom-[-7%]", delay: "1.7s" },
];

/** Premium hero visual: the club's real lab photo, duotone-treated, framed as an "innovation lab" scene with network lines and floating capability cards. */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none" aria-hidden>
      {/* glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--glow-blue),transparent_70%)] opacity-70 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 -top-10 size-64 rounded-full bg-[radial-gradient(closest-side,var(--glow-coral),transparent_70%)] opacity-60 blur-2xl" />

      {/* main frame */}
      <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-white/10 bg-brand-navy shadow-[0_40px_120px_-40px_var(--glow-blue)] ring-1 ring-brand-blue/30">
        <Image src="/images/gallery/computer-lab-session.jpg" alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[60%_40%] opacity-90 saturate-[0.85]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-blue/50 to-brand-coral/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent" />
        {/* circuit / network overlay */}
        <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 500 400" fill="none" preserveAspectRatio="none">
          <g stroke="url(#net)" strokeWidth="1">
            <path d="M40 60 L140 110 L230 70 L330 130 L440 80" /><path d="M140 110 L120 210 L230 260 L330 130" /><path d="M230 260 L360 300 L440 240 L440 80" /><path d="M40 60 L60 200 L120 210" /><path d="M60 200 L110 330 L230 260" /><path d="M360 300 L300 370" /><path d="M230 70 L230 260" strokeDasharray="4 6" />
          </g>
          <g fill="#ffffff">
            {[[40,60],[140,110],[230,70],[330,130],[440,80],[120,210],[230,260],[360,300],[440,240],[60,200],[110,330],[300,370]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r={i%3===0?3.5:2.2} className="hero-node" style={{ animationDelay: `${(i*0.35)%3}s` }} />))}
          </g>
          <defs><linearGradient id="net" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8f93ff" stopOpacity="0.9" /><stop offset="1" stopColor="#ff8a8a" stopOpacity="0.7" /></linearGradient></defs>
        </svg>
        {/* status chips inside the frame */}
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
          <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-emerald-400" /></span>
          Innovation lab · Tech AI College
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-brand-ink/60 p-4 text-white backdrop-blur">
          <p className="font-display text-lg leading-tight">AI · Software · Security · Data</p>
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10"><div className="hero-progress h-full w-1/2 rounded-full bg-gradient-to-r from-brand-blue-light to-brand-coral" /></div>
        </div>
      </div>

      {/* floating cards */}
      {cards.map((c) => (
        <div key={c.title} className={`hero-float absolute ${c.pos} hidden items-center gap-3 rounded-2xl border border-border/80 bg-card/90 py-2.5 pl-2.5 pr-4 shadow-[0_20px_50px_-20px_var(--glow-blue)] backdrop-blur sm:flex`} style={{ animationDelay: c.delay }}>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-coral text-white"><c.icon className="size-4" /></span>
          <span className="whitespace-nowrap text-[13px] font-medium leading-tight">{c.title}</span>
        </div>
      ))}
    </div>
  );
}
