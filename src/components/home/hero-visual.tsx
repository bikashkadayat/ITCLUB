import Image from "next/image";

/**
 * Hero cover: the club's own lab photograph, large and uncluttered, with one
 * quiet caption. No floating chips or network overlays competing with it.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
      <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-[radial-gradient(closest-side,var(--glow-blue),transparent_70%)] opacity-60 blur-2xl" aria-hidden />
      <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-brand-navy shadow-[0_40px_120px_-40px_var(--glow-blue)] ring-1 ring-black/5 sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/5.2]">
        <Image
          src="/images/gallery/computer-lab-session.jpg"
          alt="Students working together in the computer lab at Tech AI College."
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-[55%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" aria-hidden />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-7">
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Tech AI College · Kathmandu</span>
            <span className="mt-1 block font-display text-2xl leading-tight sm:text-[1.65rem]">Where members build together.</span>
          </span>
          <span className="hidden shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur sm:inline-flex">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden /> Since 2026
          </span>
        </figcaption>
      </figure>
    </div>
  );
}
