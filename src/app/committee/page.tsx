import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { ExecutiveSection } from "@/components/committee/executive-section";
import { Organogram } from "@/components/committee/organogram";

export const metadata = pageMetadata({
  title: "Executive Committee",
  description: "Meet the Executive Committee of the Tech & AI Innovation Club — President, Vice President, Secretary, IT/Technical Coordinator, Event/Program Coordinator, PR & Communication Officer and Faculty Advisor.",
  path: "/committee",
});

export default function CommitteePage() {
  return (
    <>
      <PageHero eyebrow="Executive Committee" crumbs={[{ label: "Executive Committee" }]} title={<>The people who <span className="gradient-text">keep the club moving</span>.</>} description="Six student office-bearers and one faculty mentor." />
      <ExecutiveSection />
      <Organogram />
    </>
  );
}
