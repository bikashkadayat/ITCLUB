import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { VerifyMember } from "@/components/membership/verify-member";

export const metadata = { ...pageMetadata({ title: "Verify a member", description: "Check a Tech & AI Innovation Club membership card against the club's published member registry.", path: "/verify" }), robots: { index: false } };

export default function VerifyPage() {
  return (
    <>
      <PageHero eyebrow="Verification" crumbs={[{ label: "Verify" }]} title={<>Membership <span className="gradient-text">verification</span>.</>} description="Confirms whether a Member ID appears in the club's published registry and shows the details printed on the card." />
      <section className="section">
        <div className="container-x max-w-3xl">
          <VerifyMember />
        </div>
      </section>
    </>
  );
}
