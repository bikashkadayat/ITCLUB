export type GalleryCategory = "Events" | "Workshops" | "Hackathons" | "Team";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
  date?: string;
}

/**
 * Real club photographs only. Add new photos to /public/images/gallery and
 * register them here with their real pixel dimensions; categories without
 * photos render an honest empty state until the first event is held.
 */
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/computer-lab-session.jpg",
    alt: "Students working at rows of desktop computers during a lab session at Tech AI College, with a mentor guiding a group at the back of the room.",
    caption: "Hands-on session in the computer lab at Tech AI College of Management & Law.",
    category: "Workshops",
    width: 1078,
    height: 1351,
  },
];

export const galleryCategories: GalleryCategory[] = ["Events", "Workshops", "Hackathons", "Team"];
