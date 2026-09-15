import { pageMetadata } from "@/lib/seo";
import { departments, departmentStructure } from "@/data/departments";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { DepartmentExplorer } from "@/components/departments/department-explorer";
import { DepartmentsGrid } from "@/components/home/departments-grid";

export const metadata = pageMetadata({
  title: "Departments",
  description: "Explore the six functional departments of the Tech & AI Innovation Club: AI & Data Science, Software Development, Cyber Security, Programming & Problem Solving, Media & Outreach, and Events & Partnership.",
  path: "/departments",
});

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        crumbs={[{ label: "Departments" }]}
        title={
          <>
            Six departments. <span className="gradient-text">One community.</span>
          </>
        }
        description={departmentStructure.oversight}
      >
        <ul className="flex flex-wrap gap-2">
          {departmentStructure.roles.map((r) => (
            <li key={r} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
              {r}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section" aria-labelledby="explorer-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Department explorer" title={<span id="explorer-heading">Find the track that fits you.</span>} description="What you will learn, what you will do and what you will build in each department." />
          <Reveal className="mt-12">
            <DepartmentExplorer />
          </Reveal>
        </div>
      </section>

      <DepartmentsGrid compact />

      <section className="section" aria-labelledby="structure-heading">
        <div className="container-x">
          <SectionHeading eyebrow="Organisational structure" align="center" title={<span id="structure-heading">How departments connect to governance.</span>} />
          <Reveal className="mx-auto mt-12 max-w-4xl">
            <div className="overflow-hidden rounded-3xl border border-border/80 bg-card">
              <div className="bg-gradient-to-r from-brand-blue to-brand-blue-deep p-5 text-center text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Oversight</p>
                <p className="mt-1 font-semibold">Faculty Advisor / Mentor — strategic &amp; administrative clearance</p>
              </div>
              <div className="border-b border-border/80 p-5 text-center">
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Executive Council</p>
                <p className="mt-1 text-sm font-medium">President · Vice President · Secretary · IT/Technical Coordinator · Event/Program Coordinator · Public Relations/Communication Officer</p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-border/80 sm:grid-cols-3">
                {departments.map((d) => (
                  <div key={d.slug} className="p-4 text-center">
                    <p className="text-sm font-medium">{d.name}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">Lead · Assistant Lead · Associates</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
