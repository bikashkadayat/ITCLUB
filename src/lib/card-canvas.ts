/**
 * Membership card rendering, entirely in the browser (Canvas 2D + qrcode + pdf-lib).
 * Mirrors the club's card design: navy → blue → coral gradient, club and college
 * logos, initials medallion, Member ID, status pill, fields and a QR code that
 * links to the public verification page.
 */
import QRCode from "qrcode";
import { PDFDocument } from "pdf-lib";
import { initials } from "@/lib/utils";
import { departmentName } from "@/lib/registry";

export interface CardData {
  name: string;
  memberId: string;
  position: string;
  departments: string[];
  program?: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  joinedOn: string;
  validUntil: string;
  verifyUrl: string;
}
export type Orientation = "portrait" | "landscape";

const SIZES: Record<Orientation, [number, number]> = { portrait: [640, 1000], landscape: [1000, 640] };
const SCALE = 2;

const fmt = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function fonts() {
  const css = getComputedStyle(document.documentElement);
  const sans = css.getPropertyValue("--font-inter").trim() || "Inter, system-ui, sans-serif";
  const display = css.getPropertyValue("--font-display").trim() || "'Playfair Display', Georgia, serif";
  return { sans, display };
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, font: string, minPx: number) {
  let size = Number(font.match(/(\d+)px/)?.[1] ?? 32);
  ctx.font = font;
  while (ctx.measureText(text).width > maxWidth && size > minPx) {
    size -= 2;
    ctx.font = font.replace(/\d+px/, `${size}px`);
  }
  return ctx.font;
}

export async function renderCard(data: CardData, orientation: Orientation): Promise<HTMLCanvasElement> {
  await document.fonts?.ready;
  const [W, H] = SIZES[orientation];
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);
  const { sans, display } = fonts();
  const [logo, college, qr] = await Promise.all([loadImage("/brand/logo-mark-square.png"), loadImage("/brand/tech-ai-college-logo.png"), QRCode.toDataURL(data.verifyUrl, { width: 360, margin: 1, color: { dark: "#0b0d2a", light: "#ffffff" } }).then(loadImage)]);

  // background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0b0d2a");
  bg.addColorStop(0.45, "#1a1fb8");
  bg.addColorStop(1, "#2027e3");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.85, H * 0.15, 10, W * 0.85, H * 0.15, W * 0.6);
  glow.addColorStop(0, "rgba(255,80,80,0.55)");
  glow.addColorStop(1, "rgba(255,80,80,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  // glass frame
  const pad = 32;
  rr(ctx, pad, pad, W - pad * 2, H - pad * 2, 28);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // top accent line
  const accent = ctx.createLinearGradient(pad, 0, W - pad, 0);
  accent.addColorStop(0, "#8f93ff");
  accent.addColorStop(1, "#ff8a8a");
  ctx.fillStyle = accent;
  ctx.fillRect(pad + 28, pad, W - pad * 2 - 56, 3);

  // header: club logo + wordmark, college logo
  const hx = pad + 32;
  const hy = pad + 30;
  rr(ctx, hx, hy, 56, 56, 14);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  if (logo) ctx.drawImage(logo, hx + 6, hy + 6, 44, 44);
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 15px ${sans}`;
  ctx.letterSpacing = "3px";
  ctx.fillText("TECH & AI INNOVATION CLUB", hx + 70, hy + 24);
  ctx.letterSpacing = "0px";
  ctx.font = `400 12px ${sans}`;
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.fillText("Under Tech AI College of Management & Law", hx + 70, hy + 44);
  if (college) {
    const cw = 130;
    const ch = (college.height / college.width) * cw;
    const boxW = cw + 16;
    const boxH = ch + 16;
    rr(ctx, W - pad - 32 - boxW, hy + 28 - boxH / 2, boxW, boxH, 12);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.drawImage(college, W - pad - 32 - boxW + 8, hy + 28 - boxH / 2 + 8, cw, ch);
  }

  const statusColor = data.status === "ACTIVE" ? "#34d399" : data.status === "INACTIVE" ? "#fbbf24" : "#f87171";
  const statusLabel = data.status === "ACTIVE" ? "Active member" : data.status === "INACTIVE" ? "Inactive" : "Suspended";
  const dept = data.departments.map(departmentName).join(" · ") || "—";

  const medallion = (cx: number, cy: number, r: number) => {
    const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    g.addColorStop(0, "#2027e3");
    g.addColorStop(0.55, "#8f93ff");
    g.addColorStop(1, "#ff5050");
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = `500 ${Math.round(r * 0.9)}px ${sans}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials(data.name), cx, cy + 2);
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
  };
  const pill = (x: number, y: number, centered = false) => {
    ctx.font = `500 13px ${sans}`;
    const w = ctx.measureText(statusLabel).width + 40;
    const px = centered ? x - w / 2 : x;
    rr(ctx, px, y, w, 30, 15);
    ctx.fillStyle = "rgba(16,185,129,0.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px + 16, y + 15, 4, 0, Math.PI * 2);
    ctx.fillStyle = statusColor;
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillText(statusLabel, px + 28, y + 19);
    return w;
  };
  const field = (label: string, value: string, x: number, y: number, maxW: number) => {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `600 10px ${sans}`;
    ctx.letterSpacing = "2px";
    ctx.fillText(label.toUpperCase(), x, y);
    ctx.letterSpacing = "0px";
    ctx.fillStyle = "#ffffff";
    ctx.font = fitText(ctx, value, maxW, `500 16px ${sans}`, 11);
    ctx.fillText(value, x, y + 22);
  };

  if (orientation === "portrait") {
    medallion(W / 2, 255, 78);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = fitText(ctx, data.name, W - 140, `500 36px ${display}`, 22);
    ctx.fillText(data.name, W / 2, 392);
    ctx.font = `500 20px ${sans}`;
    ctx.letterSpacing = "4px";
    ctx.fillStyle = "#ff8a8a";
    ctx.fillText(data.memberId, W / 2, 428);
    ctx.letterSpacing = "0px";
    ctx.textAlign = "left";
    pill(W / 2, 452, true);
    // fields panel
    const px = pad + 32;
    const py = 520;
    const pw = W - (pad + 32) * 2;
    rr(ctx, px, py, pw, 200, 20);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fill();
    field("Position", data.position, px + 22, py + 34, pw / 2 - 40);
    field("Department", dept, px + pw / 2, py + 34, pw / 2 - 40);
    field("Program", data.program || "—", px + 22, py + 92, pw / 2 - 40);
    field("Member since", fmt(data.joinedOn), px + pw / 2, py + 92, pw / 2 - 40);
    field("Valid until", fmt(data.validUntil), px + 22, py + 150, pw / 2 - 40);
    field("Member ID", data.memberId, px + pw / 2, py + 150, pw / 2 - 40);
    // QR
    if (qr) {
      const qs = 128;
      rr(ctx, W - pad - 32 - qs - 12, H - pad - 32 - qs - 12, qs + 24, qs + 24, 16);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.drawImage(qr, W - pad - 32 - qs, H - pad - 32 - qs, qs, qs);
    }
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = `400 12px ${sans}`;
    ctx.fillText("Building a Culture of Innovation,", px, H - pad - 84);
    ctx.fillText("Engineering Excellence, and Leadership.", px, H - pad - 66);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `400 10px ${sans}`;
    ctx.fillText(`Scan to verify · ${data.verifyUrl.replace(/^https?:\/\//, "")}`, px, H - pad - 40);
  } else {
    medallion(pad + 32 + 74, 258, 74);
    ctx.fillStyle = "#ffffff";
    ctx.font = fitText(ctx, data.name, 460, `500 38px ${display}`, 22);
    ctx.fillText(data.name, pad + 32 + 180, 232);
    ctx.font = `500 20px ${sans}`;
    ctx.letterSpacing = "4px";
    ctx.fillStyle = "#ff8a8a";
    ctx.fillText(data.memberId, pad + 32 + 180, 268);
    ctx.letterSpacing = "0px";
    pill(pad + 32 + 180, 286);
    if (qr) {
      const qs = 128;
      rr(ctx, W - pad - 32 - qs - 12, 176, qs + 24, qs + 24, 16);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.drawImage(qr, W - pad - 32 - qs, 188, qs, qs);
    }
    const px = pad + 32;
    const py = 372;
    const pw = W - (pad + 32) * 2;
    rr(ctx, px, py, pw, 150, 20);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fill();
    const col = pw / 3;
    field("Position", data.position, px + 22, py + 34, col - 40);
    field("Department", dept, px + 22 + col, py + 34, col * 2 - 60);
    field("Program", data.program || "—", px + 22, py + 92, col - 40);
    field("Member since", fmt(data.joinedOn), px + 22 + col, py + 92, col - 40);
    field("Valid until", fmt(data.validUntil), px + 22 + col * 2, py + 92, col - 40);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = `400 12px ${sans}`;
    ctx.fillText("Building a Culture of Innovation, Engineering Excellence, and Leadership.", px, H - pad - 40);
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `400 10px ${sans}`;
    ctx.fillText(data.verifyUrl.replace(/^https?:\/\//, ""), W - px, H - pad - 40);
    ctx.textAlign = "left";
  }
  return canvas;
}

/** Two-page PDF (portrait + landscape) sized like a standard ID card, built from the PNG renders. */
export async function cardPdf(data: CardData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Membership card ${data.memberId}`);
  pdf.setAuthor("Tech & AI Innovation Club");
  for (const o of ["portrait", "landscape"] as Orientation[]) {
    const canvas = await renderCard(data, o);
    const png = await pdf.embedPng(canvas.toDataURL("image/png"));
    const [W, H] = SIZES[o];
    const scale = (o === "portrait" ? 153.1 : 242.6) / W; // ≈ 54 × 85.6 mm at 72 dpi
    const page = pdf.addPage([W * scale + 72, H * scale + 72]);
    page.drawImage(png, { x: 36, y: 36, width: W * scale, height: H * scale });
  }
  return pdf.save();
}

export function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function printImages(title: string, dataUrls: string[]) {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return;
  w.document.write(`<!doctype html><title>${title}</title><style>body{margin:0;display:flex;flex-direction:column;align-items:center;gap:24px;padding:24px;font-family:sans-serif}img{max-width:100%;max-height:90vh;border-radius:16px}@media print{body{padding:0}img{page-break-after:always;max-height:none;width:85.6mm}img:last-child{page-break-after:auto}}</style>${dataUrls.map((u) => `<img src="${u}" alt="">`).join("")}`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 400);
}
