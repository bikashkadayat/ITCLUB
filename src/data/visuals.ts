/**
 * Photographic assets used across the site.
 *
 * `club` photos are real Tech & AI Innovation Club / Tech AI College photographs
 * and are the only images allowed in the Gallery.
 * `stock` photos are generic technology imagery supplied by the committee for
 * atmosphere (department and event banners). They must never be captioned as
 * club activities. Confirm the licence / attribution terms for each stock image
 * before public launch.
 */
export interface Visual {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "club" | "stock";
  /** CSS object-position for crops. */
  position?: string;
  /** Zoom factor for subjects that sit small in the frame. */
  zoom?: number;
}

export const visuals = {
  lab: { src: "/images/gallery/computer-lab-session.jpg", alt: "Students working at rows of computers in the lab at Tech AI College.", width: 1078, height: 1351, kind: "club", position: "50% 45%" },
  aiHologram: { src: "/images/visuals/ai-hologram.jpg", alt: "A glowing cloud hologram projected above a smartwatch.", width: 740, height: 493, kind: "stock", position: "50% 40%" },
  serverRoom: { src: "/images/visuals/server-room.jpg", alt: "Rows of server racks lit in blue and red inside a data centre.", width: 612, height: 393, kind: "stock", position: "40% 50%" },
  connectedDevices: { src: "/images/visuals/connected-devices.jpg", alt: "Hands using a phone and laptop with a network of connections overlaid.", width: 612, height: 338, kind: "stock", position: "55% 45%" },
  networkingEvent: { src: "/images/visuals/networking-event.jpg", alt: "People talking in small groups at a softly lit professional networking event.", width: 604, height: 360, kind: "stock", position: "50% 45%" },
  digitalInclusion: { src: "/images/visuals/digital-inclusion.jpg", alt: "A young woman helps an elderly man use a laptop outside a village home.", width: 612, height: 408, kind: "stock", position: "50% 40%" },
  datacenterEngineer: { src: "/images/visuals/datacenter-engineer.jpg", alt: "An engineer holding a server drive beside hardware in a data centre.", width: 612, height: 344, kind: "stock", position: "60% 50%" },
} satisfies Record<string, Visual>;

export type VisualKey = keyof typeof visuals;
