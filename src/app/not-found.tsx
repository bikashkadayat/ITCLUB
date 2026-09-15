import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RouteRecovery } from "@/components/layout/route-recovery";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden">
      <RouteRecovery />
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-60" aria-hidden />
      <div className="container-x relative py-32 text-center">
        <p className="font-mono text-sm text-primary">404 · route not found</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
          Lost in the <span className="gradient-text">network</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">The page you are looking for does not exist or has moved. Let’s route you back.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" className="rounded-full px-5" render={<Link href="/" />}>
            <ArrowLeft data-icon="inline-start" /> Back home
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-5" render={<Link href="/departments" />}>
            <Compass data-icon="inline-start" /> Explore Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
