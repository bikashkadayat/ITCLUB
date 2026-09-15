"use client";

/** Event call to action: membership first, then a seat request via WhatsApp. */
import Link from "next/link";
import { Ticket, MessageCircle } from "lucide-react";
import { whatsappUrl, eventSeatMessage } from "@/lib/whatsapp";

export function EventActions({ title, open = true }: { title?: string; open?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href="/membership" className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        <Ticket className="size-4" aria-hidden /> Become a Member to take part
      </Link>
      {open && (
        <a href={whatsappUrl(eventSeatMessage(title ?? "the event"))} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:bg-muted">
          <MessageCircle className="size-4 text-primary" aria-hidden /> Reserve a seat on WhatsApp
        </a>
      )}
    </div>
  );
}
