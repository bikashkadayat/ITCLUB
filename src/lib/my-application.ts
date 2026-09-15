/** The applicant's own copy of what they submitted (this browser only). */
export interface MyApplication {
  ref: string;
  name: string;
  email: string;
  submittedAt: string;
  delivered: "endpoint" | "mailto" | "download" | "none";
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

/** TAIC-APP-YYYYMMDD-XXXX — generated in the browser at submission time. */
export function newApplicationRef(date = new Date()) {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `TAIC-APP-${ymd}-${code}`;
}
