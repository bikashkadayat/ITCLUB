import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { departments } from "@/data/departments";

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-border/70 bg-card/40 sm:mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-blue/60 to-transparent" aria-hidden />
      <div className="container-x pt-12 sm:pt-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="full" className="w-44" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A student-led, non-profit academic and technical club operating under {siteConfig.college.name}. {siteConfig.tagline}
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <address className="not-italic leading-relaxed">
                {siteConfig.college.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            {siteConfig.contactEmail && (
              <a href={`mailto:${siteConfig.contactEmail}`} className="mt-3 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                {siteConfig.contactEmail}
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-5">
            <FooterColumn title="Quick Links" links={siteConfig.footerNav.club} />
            <FooterColumn title="Resources" links={siteConfig.footerNav.programs} />
            <FooterColumn
              title="Departments"
              links={departments.map((d) => ({ label: d.name, href: `/departments/${d.slug}` }))}
            />
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">Follow Us</h3>
            <p className="mt-3 text-sm text-muted-foreground">News, events and member stories.</p>
            <SocialLinks labelled className="mt-4" />
            <h3 className="mt-9 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">Newsletter</h3>
            <p className="mt-3 text-sm text-muted-foreground">Club updates, event announcements and project launches. No spam.</p>
            <NewsletterForm className="mt-4" compact />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border/70 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image src={siteConfig.college.logo} alt={siteConfig.college.name} width={1384} height={450} sizes="120px" className="h-9 w-auto rounded-md bg-white p-1" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              An official student organisation of
              <br />
              <span className="font-medium text-foreground/80">{siteConfig.college.name}</span>
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Established 13 September 2026. All activities are conducted within college policies under the supervision of the Faculty Advisor.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70">{title}</h3>
      <ul className="mt-3 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1.5 text-[15px] text-muted-foreground transition-colors hover:text-foreground sm:py-1 sm:text-sm">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
