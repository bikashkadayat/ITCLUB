import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { BlogList } from "@/components/blog/blog-list";
import { posts } from "@/data/blog";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export const metadata = pageMetadata({
  title: "Blog & News",
  description: "Club updates, AI, programming, cyber security articles and student stories from the Tech & AI Innovation Club.",
  path: "/blog",
});

export default async function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog & news"
        crumbs={[{ label: "Blog" }]}
        title={
          <>
            Updates, ideas and <span className="gradient-text">student stories</span>.
          </>
        }
        description="Club news from the Executive Committee, plus articles and stories written by members."
      />
      <section className="section">
        <div className="container-x">
          <Reveal>
            <BlogList posts={posts} />
          </Reveal>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-x">
          <div className="rounded-3xl border border-border/80 bg-card p-8 sm:p-10">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-2xl font-semibold">Get posts in your inbox</h2>
                <p className="mt-2 text-sm text-muted-foreground">Subscribe for club updates and new articles.</p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
