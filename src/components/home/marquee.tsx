const items = [
  "Artificial Intelligence",
  "Software Engineering",
  "Information Security",
  "Algorithmic Analysis",
  "Creative Digital Media",
  "Hackathons",
  "Open Source",
  "Kaggle",
  "CTF",
  "Agile Sprints",
];

export function Marquee() {
  const list = [...items, ...items];
  return (
    <div className="relative mt-20 overflow-hidden border-y border-border/70 bg-card/40 py-4 mask-fade-x" aria-hidden>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {list.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t}
            <span className="size-1.5 rounded-full bg-brand-coral" />
          </span>
        ))}
      </div>
    </div>
  );
}
