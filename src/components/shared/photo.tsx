import Image from "next/image";
import { visuals, type Visual, type VisualKey } from "@/data/visuals";
import { cn } from "@/lib/utils";

/**
 * A photograph with the site's single art direction: a gentle brand colour grade
 * and a soft fade into the card, so photos from different sources sit together.
 */
export function Photo({
  name,
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  fade = false,
  grade = "soft",
  priority = false,
}: {
  name: VisualKey;
  className?: string;
  sizes?: string;
  fade?: boolean;
  grade?: "soft" | "deep" | "none";
  priority?: boolean;
}) {
  const v: Visual = visuals[name];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={v.src}
        alt={v.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ objectPosition: v.position ?? "50% 50%", scale: v.zoom ? String(v.zoom) : undefined }}
      />
      {grade !== "none" && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 mix-blend-multiply",
            grade === "soft" ? "bg-gradient-to-tr from-brand-navy/45 via-brand-blue/15 to-transparent" : "bg-gradient-to-tr from-brand-navy/85 via-brand-blue-deep/55 to-brand-blue/20"
          )}
          aria-hidden
        />
      )}
      {fade && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" aria-hidden />}
    </div>
  );
}

/** A small rounded photograph used where an icon chip used to be. */
export function Thumb({ name, src, alt = "", className }: { name?: VisualKey; src?: string; alt?: string; className?: string }) {
  const url = name ? visuals[name].src : src!;
  const pos = name ? visuals[name].position : "50% 30%";
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-xl ring-1 ring-black/5", className)}>
      <Image src={url} alt={alt} fill sizes="48px" className="object-cover" style={{ objectPosition: pos ?? "50% 50%" }} />
    </span>
  );
}
