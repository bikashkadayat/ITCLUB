import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "Event, workshop, hackathon and team photos from the Tech & AI Innovation Club at Tech AI College of Management & Law.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        crumbs={[{ label: "Gallery" }]}
        title={
          <>
            Moments from <span className="gradient-text">the lab and beyond</span>.
          </>
        }
        description="All club photos live here — sessions, events and team moments. New pictures are added after every workshop, hackathon and seminar."
      />
      <section className="section">
        <div className="container-x">
          <Reveal>
            <MasonryGallery />
          </Reveal>
        </div>
      </section>
    </>
  );
}
