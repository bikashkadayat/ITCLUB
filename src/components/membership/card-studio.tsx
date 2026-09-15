"use client";

import { useEffect, useState } from "react";
import { Download, FileText, Printer, Loader2, Smartphone, RectangleHorizontal } from "lucide-react";
import { renderCard, cardPdf, downloadBlob, printImages, type CardData, type Orientation } from "@/lib/card-canvas";
import { cn } from "@/lib/utils";

/** Renders a member's card in the browser with download, PDF and print actions. */
export function CardStudio({ data }: { data: CardData }) {
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [urls, setUrls] = useState<Partial<Record<Orientation, string>>>({});
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setUrls({});
    (async () => {
      const p = (await renderCard(data, "portrait")).toDataURL("image/png");
      if (cancelled) return;
      setUrls({ portrait: p });
      const l = (await renderCard(data, "landscape")).toDataURL("image/png");
      if (!cancelled) setUrls({ portrait: p, landscape: l });
    })();
    return () => {
      cancelled = true;
    };
  }, [data]);

  const png = async () => {
    const url = urls[orientation] ?? (await renderCard(data, orientation)).toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.memberId}-${orientation}.png`;
    a.click();
  };
  const pdf = async () => {
    setBusy("pdf");
    try {
      const bytes = await cardPdf(data);
      downloadBlob(`${data.memberId}-membership-card.pdf`, new Blob([bytes as BlobPart], { type: "application/pdf" }));
    } finally {
      setBusy(null);
    }
  };
  const print = () => printImages(`Membership card ${data.memberId}`, [urls.portrait, urls.landscape].filter((u): u is string => Boolean(u)));

  const current = urls[orientation];
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-border/80 bg-card p-5 lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-border bg-background p-1">
            {(["portrait", "landscape"] as Orientation[]).map((o) => (
              <button key={o} type="button" onClick={() => setOrientation(o)} className={cn("inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium capitalize", orientation === o ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                {o === "portrait" ? <Smartphone className="size-3.5" aria-hidden /> : <RectangleHorizontal className="size-3.5" aria-hidden />} {o}
              </button>
            ))}
          </div>
          <button type="button" onClick={png} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3.5 text-xs font-medium hover:bg-muted">
            <Download className="size-3.5" aria-hidden /> Download {orientation} PNG
          </button>
        </div>
        <div className="mt-5 flex min-h-[420px] items-center justify-center rounded-2xl bg-muted/40 p-4">
          {current ? (
            // eslint-disable-next-line @next/next/no-img-element -- generated in the browser
            <img src={current} alt={`Membership card of ${data.name}, ${orientation}`} className={cn("rounded-2xl shadow-2xl shadow-brand-blue/30", orientation === "portrait" ? "max-h-[600px]" : "w-full max-w-[640px]")} />
          ) : (
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" aria-hidden /> Rendering the card…</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl border border-border/80 bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</p>
          <div className="mt-3 grid gap-2">
            <button type="button" onClick={pdf} disabled={busy === "pdf"} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              {busy === "pdf" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <FileText className="size-4" aria-hidden />} Download PDF (both sides)
            </button>
            <button type="button" onClick={png} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-muted"><Download className="size-4 text-primary" aria-hidden /> Download PNG</button>
            <button type="button" onClick={print} disabled={!urls.portrait} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium hover:bg-muted disabled:opacity-60"><Printer className="size-4 text-primary" aria-hidden /> Print</button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">The PDF is sized for a standard 54 × 86 mm ID card. Everything is generated on your device; nothing is uploaded.</p>
        </div>
        <div className="rounded-3xl border border-border/80 bg-card p-5 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Verification</p>
          <p className="mt-2 text-muted-foreground">The QR code opens this member&apos;s public verification page:</p>
          <a href={data.verifyUrl} className="mt-2 block break-all font-mono text-xs text-primary hover:underline">{data.verifyUrl}</a>
        </div>
      </div>
    </div>
  );
}
