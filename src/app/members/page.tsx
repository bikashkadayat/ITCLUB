import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { MemberArea } from "@/components/membership/member-area";

export const metadata = pageMetadata({
  title: "Member area",
  description: "Look up your Tech & AI Innovation Club membership by Member ID: status, validity, digital card and verification link.",
  path: "/members",
});

export default function MembersPage() {
  return (
    <>
      <PageHero eyebrow="Member area" crumbs={[{ label: "Member area" }]} title={<>Welcome back, <span className="gradient-text">member</span>.</>} description="Enter your Member ID to see your membership details, open your digital card and jump to events and resources. No account or password: this site keeps nothing private about you." />
      <section className="section">
        <div className="container-x max-w-4xl">
          <MemberArea />
        </div>
      </section>
    </>
  );
}
