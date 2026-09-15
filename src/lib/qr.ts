import QRCode from "qrcode";

export function qrDataUrl(text: string, size = 240) {
  return QRCode.toDataURL(text, { width: size, margin: 1, color: { dark: "#0b0d2a", light: "#ffffff" } });
}

export function qrPngBuffer(text: string, size = 300) {
  return QRCode.toBuffer(text, { width: size, margin: 1, type: "png" });
}

export const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? process.env.AUTH_URL ?? "http://localhost:3000";
