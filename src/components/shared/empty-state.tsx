import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center", className)}>
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-60" aria-hidden />
      <div className="relative mx-auto flex max-w-md flex-col items-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary text-primary">
          <Icon className="size-6" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        {action && (
          <Link href={action.href} className={cn(buttonVariants({ size: "lg" }), "mt-6 rounded-full px-5")}>
            {action.label} <ArrowRight data-icon="inline-end" />
          </Link>
        )}
      </div>
    </div>
  );
}
