import { Rocket, Building2, Crown, Zap, Network, Users, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

const reasons = [
  { icon: Rocket, title: "Real Projects", text: "Build things people actually use, then show them off on GitHub, Kaggle or Behance." },
  { icon: Building2, title: "Industry Exposure", text: "Expert panels, company visits and partnerships with tech firms across Kathmandu." },
  { icon: Crown, title: "Leadership Development", text: "Lead a department, run an event, or present your work to a full room." },
  { icon: Zap, title: "Hackathons & Competitions", text: "Kaggle sprints, capture-the-flag contests and our annual regional hackathon summit." },
  { icon: Network, title: "Networking", text: "Faculty mentors, industry guests and friends across computer science, management and law." },
  { icon: Users, title: "Team Collaboration", text: "Agile sprints, code reviews and cross-department teams every semester." },
];

export function WhyJoin() {
  return (
    <section className="section" aria-labelledby="why-join-heading">
      <div className="container-x">
        <SectionHeading eyebrow="Why join" align="center" title={<span id="why-join-heading">Why join Tech &amp; AI Innovation Club?</span>} description="Six things every member gets from the very first week, whatever your faculty or experience level." />
        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="group flex h-full gap-4 rounded-3xl border border-border/80 bg-card p-6 card-hover">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue to-brand-coral text-white shadow-md"><r.icon className="size-5" aria-hidden /></span>
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-medium"><Check className="size-4 text-emerald-600" aria-hidden /> {r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
