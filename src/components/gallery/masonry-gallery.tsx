"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { galleryImages as staticGallery, galleryCategories, type GalleryCategory, type GalleryImage } from "@/data/gallery";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

export function MasonryGallery({ extra = [] }: { extra?: GalleryImage[] }) {
  const [cat, setCat] = useState<GalleryCategory | "All">("All");
  const galleryImages = useMemo(() => [...extra, ...staticGallery], [extra]);
  const [open, setOpen] = useState<number | null>(null);

  const list = useMemo(() => (cat === "All" ? galleryImages : galleryImages.filter((g) => g.category === cat)), [cat, galleryImages]);

  const counts = Object.fromEntries(galleryCategories.map((c) => [c, galleryImages.filter((g) => g.category === c).length]));

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Gallery categories">
        {(["All", ...galleryCategories] as const).map((c) => (
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
            {c === "All" ? "All" : `${c} Gallery`}
            <span className="ml-2 font-mono text-[11px] opacity-70">{c === "All" ? galleryImages.length : counts[c]}</span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          className="mt-8"
          icon={Camera}
          title={`No ${cat.toLowerCase()} photos yet`}
          description="The Media & Outreach department documents every event in photo and video. Photos from the first cycle will appear here."
          action={{ label: "See planned events", href: "/events" }}
        />
      ) : (
        <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {list.map((img, i) => (
            <motion.figure
              key={img.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card"
            >
              <button type="button" onClick={() => setOpen(i)} className="block w-full text-left" aria-label={`Open image: ${img.caption}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={cn("h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]", img.src.includes("/brand/") && "bg-white p-8")}
                />
              </button>
              <figcaption className="flex items-start justify-between gap-3 p-4">
                <span className="text-sm text-foreground/85">{img.caption}</span>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{img.category}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-ink/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={list[open].caption}
            onClick={() => setOpen(null)}
          >
            <button type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-5" aria-hidden />
            </button>
            {list.length > 1 && (
              <>
                <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length); }} aria-label="Previous image" className="absolute left-4 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronLeft className="size-5" aria-hidden />
                </button>
                <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % list.length); }} aria-label="Next image" className="absolute right-4 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
                  <ChevronRight className="size-5" aria-hidden />
                </button>
              </>
            )}
            <motion.figure
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="max-h-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={list[open].src} alt={list[open].alt} width={list[open].width} height={list[open].height} className={cn("max-h-[80vh] w-auto rounded-2xl object-contain", list[open].src.includes("/brand/") && "bg-white p-6")} />
              <figcaption className="mt-3 text-center text-sm text-white/80">{list[open].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
