import Link from "next/link";
import { CheckCircle2, ArrowRight, CalendarDays, Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { SubmittedSummary } from "@/components/membership/submitted-summary";

export const metadata = { ...pageMetadata({ title: "Application submitted", description: "Your membership application has been received.", path: "/membership/submitted" }), robots: { index: false } };

export default function SubmittedPage() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" aria-hidden />
      <div className="container-x relative py-32">
        <div className="mx-auto max-w-xl rounded-3xl border border-border/80 bg-card p-8 text-center shadow-[0_30px_80px_-40px_var(--glow-blue)] sm:p-12">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="size-8" aria-hidden /></span>
          <h1 className="mt-6 text-3xl font-medium">Application submitted</h1>
          <p className="mt-4 text-pretty text-muted-foreground">Your application has been successfully submitted. The Executive Committee will review your application and contact you soon.</p>
          <p className="mt-3 text-sm text-muted-foreground">The committee replies on WhatsApp to the number you provided once a decision is made.</p>
          <SubmittedSummary />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/events" className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"><CalendarDays className="size-4" /> Upcoming Events</Link>
            <Link href="/departments" className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-medium hover:bg-muted"><Users className="size-4 text-primary" /> Explore departments</Link>
          </div>
          <Link href="/" className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">Back to home <ArrowRight className="size-3.5" /></Link>
        </div>
      </div>
    </section>
  );
}
