import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sortedPosts } from "@/data/blog";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { PostCard } from "@/components/blog/post-card";

export function BlogPreview() {
  return (
    <section className="section" aria-labelledby="news-heading">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Blog & news" title={<span id="news-heading">Latest from the club.</span>} />
          <Link href="/blog" className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary">
            All posts <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {sortedPosts.slice(0, 3).map((p) => (
            <StaggerItem key={p.slug}>
              <PostCard post={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
