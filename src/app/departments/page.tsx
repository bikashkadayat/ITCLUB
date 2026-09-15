import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { DepartmentsGrid } from "@/components/home/departments-grid";

export const metadata = pageMetadata({
  title: "Departments",
  description: "Explore the six functional departments of the Tech & AI Innovation Club: AI & Data Science, Software Development, Cyber Security, Programming & Problem Solving, Media & Outreach, and Events & Partnership.",
  path: "/departments",
});

export default function DepartmentsPage() {
  return (
    <>
      <PageHero eyebrow="Departments" crumbs={[{ label: "Departments" }]} title={<>Six departments. <span className="gradient-text">One community.</span></>} description="Choose up to two. Each is led by students." />
      <DepartmentsGrid compact />
    </>
  );
}
