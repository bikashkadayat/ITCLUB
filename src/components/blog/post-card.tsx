import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PostCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group flex h-full flex-col overflow-hidden rounded-3xl border border-border/80 bg-card card-hover", className)}>
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {post.cover ? (
          <Image src={post.cover} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-deep to-brand-navy">
            <div className="absolute inset-0 bg-grid opacity-20" aria-hidden />
            <span className="absolute bottom-4 left-5 font-display text-2xl text-white/90">{post.category}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-2.5 py-1 text-xs lg:text-[11px] font-semibold text-foreground backdrop-blur">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted-foreground">
          {formatDate(post.date)} · {post.readingTime}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-5 text-sm">
          <span className="text-muted-foreground">
            {post.author.name} · <span className="text-xs">{post.author.role}</span>
          </span>
          <ArrowUpRight className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </div>
      </div>
    </Link>
  );
}
