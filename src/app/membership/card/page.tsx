import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { CardPage } from "@/components/membership/card-page";

export const metadata = pageMetadata({
  title: "Membership card",
  description: "Preview, download and print your Tech & AI Innovation Club digital membership card with QR verification.",
  path: "/membership/card",
});

export default function MembershipCardPage() {
  return (
    <>
      <PageHero eyebrow="Membership" crumbs={[{ label: "Membership", href: "/membership" }, { label: "Card" }]} title={<>Your digital <span className="gradient-text">membership card</span>.</>} description="Generated on your device from the club's published member registry. Download it as PNG or PDF, print it, or show the QR code at events." />
      <section className="section">
        <div className="container-x max-w-5xl">
          <CardPage />
        </div>
      </section>
    </>
  );
}
