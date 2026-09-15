/**
 * The published member registry.
 *
 * `src/data/registry.json` is the club's public record of approved members and
 * application decisions. The Executive Committee exports it from the committee
 * tool (/admin → Data & publishing), commits it to the repository, and GitHub
 * Pages rebuilds the site. Everything the member area, status page, card page
 * and QR verification show comes from this file — there is no live database.
 *
 * Only information that already appears on a membership card is published:
 * no emails, phone numbers, motivations or notes.
 */
import registryJson from "@/data/registry.json";
import { departments } from "@/data/departments";
import { siteConfig } from "@/data/site";

export type MemberStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type DecisionStatus = "PENDING" | "WAITLISTED" | "REJECTED";

export interface RegistryMember {
  memberId: string;
  /** Application reference the membership was approved from, if any. */
  ref?: string;
  name: string;
  program?: string;
  departments: string[];
  /** "Member", or an Executive Committee position. */
  position: string;
  status: MemberStatus;
  /** ISO date (YYYY-MM-DD). */
  joinedOn: string;
  /** ISO date (YYYY-MM-DD). */
  validUntil: string;
}

export interface RegistryDecision {
  ref: string;
  status: DecisionStatus;
  decidedOn: string;
}

export interface Registry {
  publishedAt: string;
  members: RegistryMember[];
  decisions: RegistryDecision[];
}

export const publishedRegistry: Registry = registryJson as Registry;

export const MEMBER_ID_RE = /^TAIC-\d{4}-\d{4}$/;
export const APPLICATION_REF_RE = /^TAIC-APP-\d{8}-[A-Z0-9]{4,6}$/;

export const normalizeId = (s: string) => s.trim().toUpperCase().replace(/\s+/g, "");
export const isMemberId = (s: string) => MEMBER_ID_RE.test(normalizeId(s));
export const isApplicationRef = (s: string) => APPLICATION_REF_RE.test(normalizeId(s));

export const formatMemberId = (year: number, n: number) => `TAIC-${year}-${String(n).padStart(4, "0")}`;

/** Next sequential Member ID for the year, given every ID already in use (published + local). */
export function nextMemberId(existing: string[], year = new Date().getFullYear()) {
  const prefix = `TAIC-${year}-`;
  const max = existing.filter((id) => id.startsWith(prefix)).reduce((m, id) => Math.max(m, Number(id.slice(prefix.length)) || 0), 0);
  return formatMemberId(year, max + 1);
}

export const findPublishedMember = (id: string) => publishedRegistry.members.find((m) => m.memberId === normalizeId(id));
export const findPublishedByRef = (ref: string) => publishedRegistry.members.find((m) => m.ref === normalizeId(ref));
export const findPublishedDecision = (ref: string) => publishedRegistry.decisions.find((d) => d.ref === normalizeId(ref));

export const verifyUrl = (memberId: string) => `${siteConfig.url}/verify/${memberId}`;
export const departmentName = (slug: string) => departments.find((d) => d.slug === slug)?.name ?? slug;
export const departmentSlug = (nameOrSlug: string) => {
  const s = nameOrSlug.trim();
  return departments.find((d) => d.slug === s || d.name.toLowerCase() === s.toLowerCase() || d.shortName.toLowerCase() === s.toLowerCase())?.slug ?? s;
};

/** Default validity: end of the academic year following approval (31 July). */
export function defaultValidUntil(from = new Date()) {
  const y = from.getMonth() >= 7 ? from.getFullYear() + 1 : from.getFullYear();
  return `${y}-07-31`;
}

export const today = () => new Date().toISOString().slice(0, 10);
