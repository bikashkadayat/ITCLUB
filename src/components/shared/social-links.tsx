import { activeSocialLinks, type SocialLink } from "@/data/social";
import { socialIcon } from "./brand-icons";
import { cn } from "@/lib/utils";

/**
 * The club's active social channels. Monochrome at rest, brand colour on hover.
 * `labelled` shows the network name beside the mark (used while only one or two
 * channels exist, so the row never looks like a lone orphan icon).
 */
export function SocialLinks({ links = activeSocialLinks, labelled = false, className }: { links?: SocialLink[]; labelled?: boolean; className?: string }) {
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)} aria-label="Tech & AI Innovation Club on social media">
      {links.map((s) => {
        const Icon = socialIcon[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow Tech & AI Innovation Club on ${s.label} (opens in a new tab)`}
              style={{ "--brand": s.color } as React.CSSProperties}
              className={cn(
                "group/s inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background text-foreground/75 transition-all duration-200 hover:scale-[1.04] hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2",
                labelled ? "h-10 px-3.5 text-sm font-medium" : "size-10"
              )}
            >
              {Icon && <Icon className="size-[18px]" aria-hidden />}
              {labelled && <span>{s.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
