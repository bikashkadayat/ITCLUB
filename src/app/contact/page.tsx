import Image from "next/image";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";
import { whatsappUrl, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { socialIcon } from "@/components/shared/brand-icons";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact the Tech & AI Innovation Club at Tech AI College of Management & Law, New Baneshwor, Kathmandu, Nepal.",
  path: "/contact",
});

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.college.mapQuery)}&output=embed`;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        crumbs={[{ label: "Contact" }]}
        title={
          <>
            Let’s <span className="gradient-text">talk</span>.
          </>
        }
        description="Send a message and a committee member will reply."
      />

      <section className="section" aria-labelledby="contact-heading">
        <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <Reveal>
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <Image src={siteConfig.college.logo} alt={siteConfig.college.name} width={1384} height={450} className="h-12 w-auto rounded-md bg-white p-1" />
                </div>
                <h2 id="contact-heading" className="mt-6 text-2xl font-semibold">
                  {siteConfig.college.name}
                </h2>
                <address className="mt-4 space-y-3 not-italic text-sm text-foreground/85">
                  <p className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>
                      New Baneshwor
                      <br />
                      Kathmandu, Nepal
                    </span>
                  </p>
                  <p className="flex gap-3">
                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <a href={whatsappUrl("Hello Tech & AI Innovation Club,")} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">
                      WhatsApp {WHATSAPP_DISPLAY}
                    </a>
                  </p>
                  {siteConfig.contactEmail ? (
                    <p className="flex gap-3">
                      <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary underline underline-offset-4">
                        {siteConfig.contactEmail}
                      </a>
                    </p>
                  ) : null}
                </address>
                {siteConfig.social.some((s) => s.href) && (
                <div className="mt-6">
                  <ul className="flex flex-wrap gap-2" aria-label="Social media">
                    {siteConfig.social.filter((s) => s.href).map((s) => {
                      const Icon = socialIcon[s.id];
                      return (
                        <li key={s.id}>
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm hover:border-primary/50 hover:text-primary">
                              <Icon className="size-4" /> {s.label}
                            </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-border/80 bg-card">
                <iframe
                  title="Map showing Tech AI College of Management & Law, New Baneshwor, Kathmandu"
                  src={mapSrc}
                  className="h-72 w-full border-0 grayscale-[30%] dark:invert-[0.9] dark:hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.college.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-3 text-sm font-medium text-primary"
                >
                  Open in Google Maps
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05} className="lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">Send a message</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
