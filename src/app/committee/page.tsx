import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { committeeWithPhotos } from "@/lib/team-photos";
import { PageHero } from "@/components/shared/page-hero";
import { ExecutiveSection } from "@/components/committee/executive-section";
import { Organogram } from "@/components/committee/organogram";

export const metadata = pageMetadata({
  title: "Executive Committee",
  description: "Meet the Executive Committee of the Tech & AI Innovation Club — President, Vice President, Secretary, IT/Technical Coordinator, Event/Program Coordinator, PR & Communication Officer and Faculty Advisor.",
  path: "/committee",
});

export default function CommitteePage() {
  const withPhotos = committeeWithPhotos().filter((m) => m.photo);
  return (
    <>
      <PageHero eyebrow="Executive Committee" crumbs={[{ label: "Executive Committee" }]} title={<>The people who <span className="gradient-text">keep the club moving</span>.</>} description="Six student office-bearers and one faculty mentor.">
        <ul className="flex items-center" aria-label="Committee members">
          {withPhotos.map((m, i) => (
            <li key={m.id} className="-ml-3 first:ml-0" style={{ zIndex: withPhotos.length - i }}>
              <a href={`#${m.id}`} title={m.name} className="block size-14 overflow-hidden rounded-full ring-4 ring-background transition-transform hover:-translate-y-1 sm:size-16">
                <Image src={m.photo!} alt={m.name} width={64} height={64} className="size-full object-cover object-top" />
              </a>
            </li>
          ))}
          <li className="ml-4 text-sm text-muted-foreground">Meet the team below</li>
        </ul>
      </PageHero>
      <ExecutiveSection />
      <Organogram />
    </>
  );
}
