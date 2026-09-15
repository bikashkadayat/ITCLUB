import { Rocket, Building2, Crown, Zap, Network, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";

const reasons = [
  { icon: Rocket, title: "Real Projects" },
  { icon: Building2, title: "Industry Exposure" },
  { icon: Crown, title: "Leadership" },
  { icon: Zap, title: "Hackathons" },
  { icon: Network, title: "Networking" },
  { icon: Users, title: "Collaboration" },
];

export function WhyJoin() {
  return (
    <section className="section" aria-labelledby="why-join-heading">
      <div className="container-x">
        <SectionHeading eyebrow="Why join" align="center" title={<span id="why-join-heading">What every member gets.</span>} />
        <Stagger className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {reasons.map((r) => (
            <StaggerItem key={r.title}>
              <div className="group flex h-full items-center gap-4 rounded-3xl border border-border/80 bg-card px-5 py-4 card-hover sm:flex-col sm:px-4 sm:py-8 sm:text-center">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl sm:size-14 bg-gradient-to-br from-brand-blue to-brand-coral text-white shadow-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]"><r.icon className="size-6" aria-hidden /></span>
                <h3 className="text-base font-medium sm:text-sm">{r.title}</h3>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
