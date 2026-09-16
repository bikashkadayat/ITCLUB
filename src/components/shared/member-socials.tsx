import { Globe } from "lucide-react";
import type { MemberSocials as Socials } from "@/data/committee";
import { LinkedinIcon, FacebookIcon, GithubIcon } from "./brand-icons";
import { cn } from "@/lib/utils";

/**
 * A committee member's social row, always in the same order so every card is
 * complete: LinkedIn, Facebook, GitHub, Website. Channels with a URL are real
 * links with a brand hover; the rest are shown at 40% opacity, are not
 * interactive, and explain themselves with a "Profile coming soon" tooltip.
 */
const channels = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon, hover: "hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white focus-visible:ring-[#0A66C2]" },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, hover: "hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white focus-visible:ring-[#1877F2]" },
  { key: "github", label: "GitHub", Icon: GithubIcon, hover: "hover:border-[#181717] hover:bg-[#181717] hover:text-white focus-visible:ring-[#181717] dark:hover:border-white dark:hover:bg-white dark:hover:text-[#181717]" },
  { key: "website", label: "Website", Icon: Globe, hover: "hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-primary" },
] as const;

export function MemberSocials({
  socials = {},
  name,
  onDark = false,
  size = "md",
  align = "center",
  className,
}: {
  socials?: Socials;
  name: string;
  onDark?: boolean;
  size?: "sm" | "md";
  /** Tooltip alignment; use "end" when the row sits at a card's right edge. */
  align?: "center" | "end";
  className?: string;
}) {
  const box = size === "sm" ? "size-8 rounded-lg" : "size-9 rounded-xl";
  const icon = size === "sm" ? "size-3.5" : "size-4";
  const base = onDark ? "border-white/25 bg-white/10 text-white backdrop-blur" : "border-border bg-background text-foreground/70";
  return (
    <ul className={cn("flex items-center gap-2", className)} aria-label={`${name} on social media`}>
      {channels.map(({ key, label, Icon, hover }, i) => {
        const href = socials[key];
        const tipPos = align === "end" && i >= channels.length - 2 ? "right-0" : "left-1/2 -translate-x-1/2";
        return (
          <li key={key} className="group/sc relative" aria-hidden={href ? undefined : true}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} on ${label} (opens in a new tab)`}
                className={cn("inline-flex items-center justify-center border transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", box, base, hover)}
              >
                <Icon className={icon} aria-hidden />
              </a>
            ) : (
              <span className={cn("inline-flex cursor-not-allowed items-center justify-center border opacity-40", box, base)}>
                <Icon className={icon} aria-hidden />
              </span>
            )}
            <span
              role="tooltip"
              className={cn(
                "pointer-events-none absolute bottom-full z-20 mb-2 translate-y-1 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-lg transition-all duration-150 group-hover/sc:translate-y-0 group-hover/sc:opacity-100 group-focus-within/sc:translate-y-0 group-focus-within/sc:opacity-100",
                tipPos
              )}
            >
              {href ? `View ${label} Profile` : "Profile coming soon"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
