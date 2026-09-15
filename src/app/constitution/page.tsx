import { Download, FileText } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { constitution } from "@/data/constitution";
import { documents } from "@/data/resources";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";

export const metadata = pageMetadata({
  title: "Constitution & Bylaws",
  description: "The full Constitution and Bylaws of the Tech & AI Innovation Club, Tech AI College of Management & Law — eighteen articles on name, status, membership, committee, meetings, finance and amendments.",
  path: "/constitution",
});

export default function ConstitutionPage() {
  const pdf = documents.find((d) => d.kind === "Constitution")!;
  return (
    <>
      <PageHero
        eyebrow="Constitution & Bylaws"
        crumbs={[{ label: "Constitution" }]}
        title={
          <>
            The rules we <span className="gradient-text">govern ourselves by</span>.
          </>
        }
        description="Adopted by the founding members on 13 September 2026. The rules, regulations and policies of Tech AI College of Management & Law take precedence wherever applicable; this Constitution takes effect upon approval by the college administration."
      >
        <a href={pdf.file} download className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold hover:bg-muted">
          <Download className="size-4 text-primary" aria-hidden /> Download PDF ({pdf.pages} pages)
        </a>
      </PageHero>

      <section className="section">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <nav aria-label="Articles" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Articles</p>
              <ol className="mt-3 max-h-[70vh] space-y-0.5 overflow-y-auto pr-2 text-sm">
                {constitution.map((a) => (
                  <li key={a.number}>
                    <a href={`#article-${a.number}`} className="flex gap-2 rounded-lg px-2 py-1.5 text-foreground/75 hover:bg-muted hover:text-foreground">
                      <span className="font-mono text-xs text-primary">{String(a.number).padStart(2, "0")}</span> {a.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="space-y-6 lg:col-span-9">
            {constitution.map((a) => (
              <Reveal key={a.number} y={12}>
                <article id={`article-${a.number}`} className="scroll-mt-28 rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
                  <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    <FileText className="size-3.5" aria-hidden /> Article {a.number}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">{a.title}</h2>
                  <div className="prose-club mt-4 text-[15px]">
                    {a.paragraphs?.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {a.numbered && (
                      <ol>
                        {a.numbered.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ol>
                    )}
                    {a.bullets && (
                      <ul>
                        {a.bullets.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    )}
                    {a.sections?.map((s) => (
                      <div key={s.title}>
                        <h3 className="!mt-6 !text-base">{s.title}</h3>
                        <ul>
                          {s.bullets.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
