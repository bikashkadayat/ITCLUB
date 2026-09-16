import { LinkedinIcon } from "./brand-icons";
import { cn } from "@/lib/utils";

/**
 * LinkedIn profile link: the official "in" mark in a square button that takes
 * LinkedIn blue on hover, with a tooltip. Renders nothing when there is no URL,
 * so cards without a profile stay clean.
 */
export function LinkedInButton({ href, name, size = "md", onDark = false, tipAlign = "center", className }: { href?: string; name: string; size?: "sm" | "md"; onDark?: boolean; tipAlign?: "center" | "end"; className?: string }) {
  if (!href) return null;
  const label = `View ${name}'s LinkedIn profile (opens in a new tab)`;
  return (
    <span className={cn("group/li relative inline-flex", className)}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A66C2] focus-visible:ring-offset-2",
          size === "sm" ? "size-9" : "size-10",
          onDark ? "border-white/25 bg-white/10 text-white backdrop-blur" : "border-border bg-background text-[#0A66C2]"
        )}
      >
        <LinkedinIcon className={size === "sm" ? "size-4" : "size-[18px]"} aria-hidden />
      </a>
      <span role="tooltip" className={cn("pointer-events-none absolute translate-y-1 whitespace-nowrap", tipAlign === "end" ? "right-0 top-full mt-2" : "bottom-full left-1/2 mb-2 -translate-x-1/2", " rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background opacity-0 shadow-lg transition-all duration-150 group-hover/li:translate-y-0 group-hover/li:opacity-100 group-focus-within/li:translate-y-0 group-focus-within/li:opacity-100")}>
        View LinkedIn Profile
      </span>
    </span>
  );
}
