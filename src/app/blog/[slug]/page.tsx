import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { formatDate } from "@/lib/utils";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { AvatarInitials } from "@/components/shared/avatar-initials";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article", image: post.cover });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="relative overflow-hidden border-b border-border/70">
        <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-60" aria-hidden />
        <div className="container-x relative pb-12 pt-32 sm:pt-40">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.category }]} className="mb-6" />
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{post.category}</span>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-4">
            <AvatarInitials name={post.author.name} size={48} className="size-12 text-base" />
            <div className="text-sm">
              <p className="font-medium">{post.author.name}</p>
              <p className="text-muted-foreground">
                {post.author.role} · {formatDate(post.date)} · {post.readingTime}
              </p>
            </div>
          </div>
        </div>
      </header>

      {post.cover && (
        <div className="container-x mt-10">
          <Image src={post.cover} alt="" width={1600} height={900} className="max-h-[520px] w-full rounded-3xl border border-border/80 object-cover" priority />
        </div>
      )}

      <div className="container-x grid grid-cols-1 gap-12 py-14 lg:grid-cols-12">
        <div className="prose-club max-w-none lg:col-span-8">
          {post.content.map((b, i) => {
            switch (b.type) {
              case "h2":
                return <h2 key={i}>{b.text}</h2>;
              case "ul":
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              case "ol":
                return (
                  <ol key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ol>
                );
              case "quote":
                return <blockquote key={i}>{b.text}</blockquote>;
              default:
                return (
                  <p key={i} className="text-[17px]">
                    {b.text}
                  </p>
                );
            }
          })}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
        </div>
        <aside className="space-y-5 lg:col-span-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source documents</p>
            <p className="mt-2 text-sm text-muted-foreground">Club updates are drawn from the official founding documents, available in the Resource Center.</p>
            <Link href="/resources" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Open Resource Center <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-deep p-6 text-white">
            <p className="text-lg font-semibold">Write for the blog</p>
            <p className="mt-1 text-sm text-white/85">Members from any department can publish articles and student stories.</p>
            <Link href="/membership" className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-brand-blue">
              Become a Member <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </aside>
      </div>

      <section className="border-t border-border/70 py-14">
        <div className="container-x">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">More from the club</h2>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <ArrowLeft className="size-4" aria-hidden /> All posts
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
