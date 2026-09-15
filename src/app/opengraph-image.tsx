import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "@/data/site";

/** Prerendered at build time (required for the static GitHub Pages export). */
export const dynamic = "force-static";

export const runtime = "nodejs";
export const alt = "Tech & AI Innovation Club — Tech AI College of Management & Law";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/logo-mark-square.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(135deg, #06071a 0%, #0d0f2b 55%, #14189c 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "radial-gradient(closest-side, rgba(255,80,80,0.45), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -200,
            width: 600,
            height: 600,
            borderRadius: 999,
            background: "radial-gradient(closest-side, rgba(92,98,255,0.5), transparent)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", width: 120, height: 120, borderRadius: 28, background: "white", alignItems: "center", justifyContent: "center" }}>
            <img src={logoSrc} width={96} height={96} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#ff8a8a", fontFamily: "sans-serif" }}>Innovation Club</div>
            <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>
              <span>Tech</span>
              <span style={{ color: "#ff5050", margin: "0 12px" }}>&</span>
              <span>AI</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 34, lineHeight: 1.25, maxWidth: 900, fontFamily: "sans-serif" }}>{siteConfig.tagline}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#c7caff", fontFamily: "sans-serif" }}>
            <div style={{ width: 40, height: 3, background: "#ff5050" }} />
            {siteConfig.college.name} · New Baneshwor, Kathmandu
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
