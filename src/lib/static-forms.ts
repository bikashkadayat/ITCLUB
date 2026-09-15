/**
 * Form delivery for the static site (GitHub Pages has no server). Two paths,
 * in order of preference:
 *
 *  1. `NEXT_PUBLIC_FORM_ENDPOINT` – any endpoint that accepts a JSON POST and
 *     returns 2xx (Formspree, Getform, Basin, a Google Apps Script web app…).
 *  2. `mailto:` to `NEXT_PUBLIC_CONTACT_EMAIL` – opens the visitor's email app
 *     with the submission pre-filled.
 */
import { siteConfig } from "@/data/site";
/** Optional JSON endpoint (Formspree, Getform, Basin, a Google Apps Script…) that receives form submissions. */
export const staticFormEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

/** True when at least one delivery path (endpoint or club email) is configured. */
export const hasDeliveryChannel = Boolean(staticFormEndpoint || siteConfig.contactEmail);

export type StaticFormResult = { ok: true; via: "endpoint" | "mailto" } | { ok: false; message: string };

export async function submitStaticForm(
  form: "membership" | "contact" | "newsletter",
  payload: Record<string, string>,
  mail: { subject: string; body: string }
): Promise<StaticFormResult> {
  if (staticFormEndpoint) {
    try {
      const res = await fetch(staticFormEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ form, submittedAt: new Date().toISOString(), ...payload }),
      });
      if (res.ok) return { ok: true, via: "endpoint" };
      return { ok: false, message: "The form service rejected the submission. Please try again in a moment or email us directly." };
    } catch {
      return { ok: false, message: "Could not reach the form service. Check your connection and try again." };
    }
  }
  const to = siteConfig.contactEmail;
  if (!to) return { ok: false, message: "Online submissions are not configured on this site yet. Please contact the Executive Committee at the college." };
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(mail.subject)}&body=${encodeURIComponent(mail.body)}`;
  return { ok: true, via: "mailto" };
}

/** "Key: value" lines for the mailto body. */
export const mailBody = (rows: [string, string][]) => rows.map(([k, v]) => `${k}: ${v}`).join("\n");
