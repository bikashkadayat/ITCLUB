import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function pageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: siteConfig.locale,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: new URL(siteConfig.brand.logoOriginal, siteConfig.url).toString(),
    foundingDate: siteConfig.foundedOn,
    slogan: siteConfig.tagline,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.college.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: "New Baneshwor, Kathmandu",
        addressCountry: "NP",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.college.name,
      addressLocality: "New Baneshwor",
      addressRegion: "Kathmandu",
      addressCountry: "NP",
    },
  };
}
