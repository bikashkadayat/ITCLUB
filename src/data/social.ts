/**
 * Official social channels. Set `href` to activate a channel; entries with an
 * empty href are ignored everywhere, so a new network is a one-line change.
 *
 * LinkedIn uses the public company-page URL (the numeric ID form resolves to the
 * public page for everyone; `/admin/...` URLs are only for page admins).
 */
export type SocialId = "linkedin" | "facebook" | "instagram" | "youtube" | "github";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
  /** Brand accent used on hover. */
  color: string;
}

export const socialLinks: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/143868915/", color: "#0A66C2" },
  { id: "facebook", label: "Facebook", href: "", color: "#1877F2" },
  { id: "instagram", label: "Instagram", href: "", color: "#E4405F" },
  { id: "youtube", label: "YouTube", href: "", color: "#FF0000" },
  { id: "github", label: "GitHub", href: "", color: "#181717" },
];

export const activeSocialLinks = socialLinks.filter((s) => s.href);
export const linkedinCompany = socialLinks.find((s) => s.id === "linkedin")?.href ?? "";
