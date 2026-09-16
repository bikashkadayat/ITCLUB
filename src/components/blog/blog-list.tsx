"use client";

import { useMemo, useState } from "react";
import { blogCategories, posts as staticPosts, type BlogCategory, type BlogPost } from "@/data/blog";
import { PostCard } from "./post-card";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

export function BlogList({ posts = staticPosts }: { posts?: BlogPost[] }) {
  const [cat, setCat] = useState<BlogCategory | "All">("All");
  const list = useMemo(() => (cat === "All" ? posts : posts.filter((p) => p.category === cat)), [cat, posts]);

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Blog categories">
        {(["All", ...blogCategories] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground/75 hover:bg-muted"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <EmptyState
          className="mt-8"
          title={`No ${cat} posts yet`}
          description={
            cat === "Student Stories"
              ? "Student Stories are written by members about their projects, internships and competitions. Join the club and share yours."
              : `${cat} articles are written by department members. Join the relevant department to contribute the first post.`
          }
          action={{ label: "Become a Member", href: "/membership" }}
        />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
