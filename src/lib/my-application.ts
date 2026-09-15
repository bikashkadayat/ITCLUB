/** The applicant's own copy of what they submitted (this browser only). */
export interface MyApplication {
  ref: string;
  name: string;
  email: string;
  submittedAt: string;
  delivered: "whatsapp" | "download" | "none";
}

const KEY = "taic-my-application";
const MEMBER_KEY = "taic-my-member-id";

export function loadMyApplication(): MyApplication | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MyApplication) : null;
  } catch {
    return null;
  }
}
export function saveMyApplication(a: MyApplication) {
  try {
    localStorage.setItem(KEY, JSON.stringify(a));
  } catch {}
}
export function loadMyMemberId(): string | null {
  try {
    return localStorage.getItem(MEMBER_KEY);
  } catch {
    return null;
  }
}
export function saveMyMemberId(id: string) {
  try {
    localStorage.setItem(MEMBER_KEY, id);
  } catch {}
}

/**
 * TAIC-APP-YYYYMMDD-XXXX — generated in the browser at submission time, using the
 * Nepal calendar date. There is no server to hand out sequential numbers, so the
 * suffix is four random characters from an unambiguous alphabet.
 */
export function newApplicationRef(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const ymd = `${get("year")}${get("month")}${get("day")}`;
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `TAIC-APP-${ymd}-${code}`;
}
