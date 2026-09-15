import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { StatusChecker } from "@/components/membership/status-checker";

export const metadata = pageMetadata({
  title: "Application status",
  description: "Check the status of your Tech & AI Innovation Club membership application with your application reference.",
  path: "/membership/status",
});

export default function StatusPage() {
  return (
    <>
      <PageHero eyebrow="Membership" crumbs={[{ label: "Membership", href: "/membership" }, { label: "Status" }]} title={<>Where is my <span className="gradient-text">application</span>?</>} description="Enter the reference you received when you applied. Approved members see their Member ID and can open their digital card right away." />
      <section className="section">
        <div className="container-x max-w-3xl">
          <StatusChecker />
        </div>
      </section>
    </>
  );
}
