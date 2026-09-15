import { Vote, Clock, Users } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { governance, foundingChairperson } from "@/data/committee";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
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
      <PageHero
        eyebrow="Executive Committee"
        crumbs={[{ label: "Executive Committee" }]}
        title={
          <>
            The people who <span className="gradient-text">keep the club moving</span>.
          </>
        }
        description="Six student office-bearers and one faculty mentor, formed by the founding members on 13 September 2026."
      />

      <ExecutiveSection />
      <Organogram />

      <section className="section" aria-labelledby="gov-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Governance" align="center" title={<span id="gov-heading">Term, elections and quorum.</span>} />
          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { Icon: Clock, title: "Term of office", text: governance.termOfOffice },
              { Icon: Vote, title: "Selection / election", text: governance.election },
              { Icon: Users, title: "Meetings & quorum", text: governance.quorum },
            ].map(({ Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="h-full rounded-3xl border border-border/80 bg-card p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-8 text-center text-xs text-muted-foreground">Founding meeting chaired by {foundingChairperson} · Minutes by Sambridhi Subedi · 13 September 2026</p>
        </div>
      </section>
    </>
  );
}
