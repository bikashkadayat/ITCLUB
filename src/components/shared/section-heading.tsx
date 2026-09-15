import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({ eyebrow, title, description, align = "left", className, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          <span className="h-px w-6 bg-primary/60" aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag className="text-balance text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">{title}</Tag>
      {description && <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>}
    </Reveal>
  );
}
