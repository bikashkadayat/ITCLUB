/**
 * WhatsApp delivery for the contact form, newsletter and event seat requests.
 * (Membership applications go through the official Microsoft Form instead.) GitHub Pages has no server, so
 * submissions are composed in the browser and handed to WhatsApp through a
 * `wa.me` link; the Executive Committee receives them as chat messages.
 */

/** Club WhatsApp number in international format (country code + number, digits only). */
export const WHATSAPP_NUMBER = "9779705811712";
/** Same number as shown to visitors. */
export const WHATSAPP_DISPLAY = "+977 970-5811712";

export const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const SITE_HOST = "itclub.techaicollege.edu.np";

export function contactMessage(d: { name: string; email: string; subject: string; message: string }) {
  return ["Hello Tech & AI Innovation Club,", "", `Subject:\n${d.subject}`, "", `Name:\n${d.name}`, "", `Email:\n${d.email}`, "", `Message:\n${d.message}`, "", "Thank you."].join("\n");
}

export const newsletterMessage = (email: string) => `Hello Tech & AI Innovation Club,\n\nPlease add ${email} to the club newsletter list.\n\nThank you.`;

export const eventSeatMessage = (title: string) => `Hello Tech & AI Innovation Club,\n\nI would like to reserve a seat for "${title}".\n\nThank you.`;
