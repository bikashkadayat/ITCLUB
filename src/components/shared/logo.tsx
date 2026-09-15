import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

interface LogoProps {
  variant?: "full" | "mark" | "lockup";
  className?: string;
  priority?: boolean;
  href?: string | null;
}

/**
 * Official club logo. `mark` renders the icon only, `full` the complete logo,
 * and `lockup` the mark next to a typeset name (ideal for the navbar).
 */
export function Logo({ variant = "lockup", className, priority, href = "/" }: LogoProps) {
  const inner =
    variant === "full" ? (
      <Image
        src={siteConfig.brand.logo}
        alt="Tech & AI Innovation Club"
        width={1306}
        height={669}
        priority={priority}
        sizes="(min-width: 640px) 224px, 176px"
        className={cn("h-auto w-56", className)}
      />
    ) : variant === "mark" ? (
      <Image
        src={siteConfig.brand.logoMark}
        alt="Tech & AI Innovation Club"
        width={700}
        height={349}
        priority={priority}
        className={cn("h-auto w-14", className)}
      />
    ) : (
      <span className={cn("group/logo inline-flex items-center gap-2.5", className)}>
        <Image
          src={siteConfig.brand.logoMark}
          alt=""
          width={700}
          height={349}
          priority={priority}
          sizes="56px"
          className="h-6 w-auto transition-transform duration-500 group-hover/logo:rotate-[-4deg]"
        />
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold tracking-wide text-brand-blue dark:text-white sm:text-base">
            TECH <span className="text-brand-coral">&amp;</span> AI
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-brand-red dark:text-brand-coral-light">
            Innovation Club
          </span>
          <span className="sr-only">, home</span>
        </span>
      </span>
    );

  if (href === null) return inner;
  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {inner}
    </Link>
  );
}
