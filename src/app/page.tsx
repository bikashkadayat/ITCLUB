import { Hero } from "@/components/home/hero";
import { StatsCards } from "@/components/home/stats-cards";
import { WhyJoin } from "@/components/home/why-join";
import { DepartmentsGrid } from "@/components/home/departments-grid";
import { Leadership } from "@/components/home/leadership";
import { NextEvent } from "@/components/home/next-event";
import { JoinCta } from "@/components/home/join-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCards />
      <WhyJoin />
      <DepartmentsGrid />
      <Leadership />
      <NextEvent />
      <JoinCta />
    </>
  );
}
