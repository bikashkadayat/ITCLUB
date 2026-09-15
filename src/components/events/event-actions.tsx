"use client";

/** Event call to action: membership first, then a seat request by email. */
import Link from "next/link";
import { Ticket, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";

export function EventActions({ title, open = true }: { title?: string; open?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href="/membership" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <Ticket className="size-4" aria-hidden /> Become a Member to take part
      </Link>
      {siteConfig.contactEmail && open && (
        <a href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(`Seat request: ${title ?? "event"}`)}`} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:bg-muted">
          <Mail className="size-4 text-primary" aria-hidden /> Reserve a seat by email
        </a>
      )}
    </div>
  );
}
