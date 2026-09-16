/**
 * Small graphics that replace placeholder icons in dense sections: the club's
 * numbers, document cards, application steps and portrait fallbacks. Each is a
 * miniature of something real rather than a symbol in a circle.
 */
import { cn } from "@/lib/utils";

type StatKind = "faculties" | "departments" | "events" | "learning";

/** A miniature of the thing being counted, sitting behind each statistic. */
export function StatArt({ kind, className }: { kind: StatKind; className?: string }) {
  const id = `s-${kind}`;
  return (
    <svg viewBox="0 0 120 80" fill="none" role="img" aria-hidden className={cn("h-full w-full", className)}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-brand-blue-light)" />
          <stop offset="1" stopColor="var(--color-brand-blue-deep)" />
        </linearGradient>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-brand-coral)" />
          <stop offset="1" stopColor="var(--color-brand-rose)" />
        </linearGradient>
      </defs>
      {kind === "faculties" && (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${16 + i * 30} ${46 - i * 4})`}>
              <path d="M0 0l16 8-16 8-16-8z" fill={i === 1 ? `url(#${id}-c)` : `url(#${id}-g)`} opacity={0.55 + i * 0.2} />
              <path d="M-10 12v8c0 4 5 7 10 7s10-3 10-7v-8l-10 5z" fill={i === 1 ? `url(#${id}-c)` : `url(#${id}-g)`} opacity={0.35 + i * 0.15} />
            </g>
          ))}
        </g>
      )}
      {kind === "departments" && (
        <g>
          {[0, 1, 2].map((c) => [0, 1].map((r) => (
            <rect key={`${c}-${r}`} x={14 + c * 32} y={20 + r * 26} width="26" height="20" rx="5" fill={c === 1 && r === 0 ? `url(#${id}-c)` : `url(#${id}-g)`} opacity={0.3 + c * 0.2 + r * 0.15} />
          )))}
        </g>
      )}
      {kind === "events" && (
        <g>
          <rect x="14" y="14" width="92" height="56" rx="8" fill={`url(#${id}-g)`} opacity="0.18" />
          <rect x="14" y="14" width="92" height="14" rx="7" fill={`url(#${id}-g)`} opacity="0.7" />
          {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
            <rect key={`${r}-${c}`} x={24 + c * 20} y={36 + r * 11} width="12" height="7" rx="2.5" fill={r === 1 && c === 2 ? `url(#${id}-c)` : "currentColor"} opacity={r === 1 && c === 2 ? 1 : 0.2} />
          )))}
        </g>
      )}
      {kind === "learning" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={16 + i * 18} y={62 - (i + 1) * 9} width="12" height={(i + 1) * 9} rx="4" fill={i === 4 ? `url(#${id}-c)` : `url(#${id}-g)`} opacity={0.35 + i * 0.16} />
          ))}
          <path d="M18 50l18-12 18 8 18-16 18-10" stroke={`url(#${id}-c)`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}

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

/** Four small scenes for the membership steps. */
export function StepArt({ step, className }: { step: number; className?: string }) {
  const id = `st-${step}`;
  return (
    <svg viewBox="0 0 96 72" fill="none" role="img" aria-hidden className={cn("h-full w-full", className)}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--color-brand-blue-light)" />
          <stop offset="1" stopColor="var(--color-brand-blue-deep)" />
        </linearGradient>
      </defs>
      {step === 1 && (
        <g>
          <rect x="20" y="8" width="56" height="58" rx="7" fill="#FFFFFF" stroke="#E1E5F3" />
          <rect x="28" y="20" width="26" height="5" rx="2.5" fill="#C7CCE4" />
          <rect x="28" y="31" width="40" height="7" rx="3.5" fill="#EDEFF8" />
          <rect x="28" y="44" width="40" height="7" rx="3.5" fill="#EDEFF8" />
          <rect x="28" y="57" width="22" height="6" rx="3" fill={`url(#${id}-g)`} />
        </g>
      )}
      {step === 2 && (
        <g>
          <rect x="14" y="14" width="56" height="34" rx="12" fill="#25D366" opacity="0.9" />
          <path d="M28 46l-6 12 14-8z" fill="#25D366" opacity="0.9" />
          <rect x="26" y="26" width="30" height="4" rx="2" fill="#FFFFFF" opacity="0.9" />
          <rect x="26" y="34" width="20" height="4" rx="2" fill="#FFFFFF" opacity="0.7" />
          <path d="M70 30l14-8-4 16z" fill={`url(#${id}-g)`} />
        </g>
      )}
      {step === 3 && (
        <g>
          <rect x="16" y="10" width="46" height="52" rx="6" fill="#FFFFFF" stroke="#E1E5F3" />
          <rect x="24" y="22" width="24" height="4" rx="2" fill="#C7CCE4" />
          <rect x="24" y="32" width="30" height="4" rx="2" fill="#D8DCEE" />
          <circle cx="66" cy="46" r="17" fill="none" stroke={`url(#${id}-g)`} strokeWidth="5" />
          <path d="M78 58l8 8" stroke={`url(#${id}-g)`} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {step === 4 && (
        <g>
          <circle cx="48" cy="36" r="24" fill={`url(#${id}-g)`} opacity="0.15" />
          <circle cx="48" cy="36" r="17" fill={`url(#${id}-g)`} />
          <path d="M40 36l6 6 11-13" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}
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
    <svg viewBox="0 0 120 120" fill="none" role="img" aria-hidden className={cn("h-full w-full", className)}>
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
