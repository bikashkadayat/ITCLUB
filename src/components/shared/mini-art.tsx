/**
 * Small graphics that replace placeholder icons in dense sections: the club's
 * numbers, document cards, application steps and portrait fallbacks. Each is a
 * miniature of something real rather than a symbol in a circle.
 */
import { cn } from "@/lib/utils";


/** A stack of signed pages: used on document cards in place of a file icon. */
export function DocArt({ pages = 1, className }: { pages?: number; className?: string }) {
  const id = "doc";
  return (
    <svg viewBox="0 0 72 88" fill="none" role="img" aria-hidden className={cn("h-full w-full", className)}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-brand-blue-light)" />
          <stop offset="1" stopColor="var(--color-brand-blue-deep)" />
        </linearGradient>
        <filter id={`${id}-s`} x="-30%" y="-20%" width="170%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1B1F4B" floodOpacity="0.16" />
        </filter>
      </defs>
      {pages > 1 && <rect x="16" y="10" width="46" height="66" rx="6" fill="#DFE3F2" transform="rotate(6 39 43)" />}
      <g filter={`url(#${id}-s)`}>
        <rect x="8" y="6" width="50" height="72" rx="6" fill="#FFFFFF" />
        <path d="M40 6l18 16H44a4 4 0 01-4-4z" fill="#E4E8F6" />
        <rect x="17" y="30" width="30" height="4" rx="2" fill="#C7CCE4" />
        <rect x="17" y="40" width="24" height="4" rx="2" fill="#D8DCEE" />
        <rect x="17" y="50" width="28" height="4" rx="2" fill="#D8DCEE" />
        <circle cx="46" cy="64" r="9" fill={`url(#${id}-g)`} opacity="0.85" />
        <path d="M42 64l3 3 6-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

/**
 * Portrait placeholder for a member whose photo has not been supplied. A quiet
 * studio-style silhouette rather than initials in a circle; it never invents a
 * face for a real person.
 */
export function PortraitPlaceholder({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" role="img" aria-hidden preserveAspectRatio="xMidYMid slice" className={cn("h-full w-full", className)}>
      <defs>
        <linearGradient id="pp-bg" x1="0" y1="0" x2="0.8" y2="1">
          <stop stopColor="var(--color-brand-blue-deep)" />
          <stop offset="1" stopColor="var(--color-brand-navy)" />
        </linearGradient>
        <radialGradient id="pp-light" cx="0.5" cy="0.28" r="0.62">
          <stop stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="120" height="120" fill="url(#pp-bg)" />
      <rect width="120" height="120" fill="url(#pp-light)" />
      <g opacity="0.94">
        <circle cx="60" cy="45" r="17" fill="#EEF1FF" />
        <path d="M28 120c0-17 10-30 24-35a30 30 0 0016 0c14 5 24 18 24 35z" fill="#E4E8FA" />
        <path d="M28 120c0-17 10-30 24-35a30 30 0 0016 0c14 5 24 18 24 35z" fill="url(#pp-light)" />
      </g>
      <circle cx="60" cy="60" r="43" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1.5" />
    </svg>
  );
}
