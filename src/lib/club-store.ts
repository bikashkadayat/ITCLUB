/**
 * Committee tool storage. Everything lives in this browser's localStorage —
 * there is no server. The committee exports backups (private) and the public
 * registry (src/data/registry.json) from /admin → Data & publishing.
 */
"use client";

import { useCallback, useEffect, useState } from "react";
import { type Registry, type RegistryMember, type DecisionStatus, departmentSlug, departmentName } from "@/lib/registry";

export type ApplicationStatus = "PENDING" | "APPROVED" | "WAITLISTED" | "REJECTED";

export interface Application {
  ref: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  semester: string;
  /** Department slugs. */
  departments: string[];
  skills: string[];
  motivation: string;
  submittedAt: string;
  status: ApplicationStatus;
  notes?: string;
  reviewedAt?: string;
  memberId?: string;
}

export interface StoredMember extends RegistryMember {
  email?: string;
  phone?: string;
  semester?: string;
  notes?: string;
  createdAt: string;
}

export interface ClubStore {
  version: 1;
  updatedAt: string;
  applications: Application[];
  members: StoredMember[];
}

export const STORE_KEY = "taic-committee-tool-v1";
const empty = (): ClubStore => ({ version: 1, updatedAt: new Date(0).toISOString(), applications: [], members: [] });

export function loadStore(): ClubStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return empty();
    const s = JSON.parse(raw) as Partial<ClubStore>;
    return { version: 1, updatedAt: s.updatedAt ?? new Date(0).toISOString(), applications: s.applications ?? [], members: s.members ?? [] };
  } catch {
    return empty();
  }
}
export function saveStore(s: ClubStore) {
  localStorage.setItem(STORE_KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("taic-store"));
}

/** React hook: [store, update, ready]. `ready` is false until localStorage has been read on the client. */
export function useClubStore() {
  const [store, setStore] = useState<ClubStore>(empty);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const read = () => setStore(loadStore());
    read();
    setReady(true);
    window.addEventListener("taic-store", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("taic-store", read);
      window.removeEventListener("storage", read);
    };
  }, []);
  const update = useCallback((fn: (s: ClubStore) => ClubStore) => {
    const next = { ...fn(loadStore()), updatedAt: new Date().toISOString() };
    saveStore(next);
    setStore(next);
  }, []);
  return [store, update, ready] as const;
}

/* ---------- importing applications ---------- */

const str = (v: unknown) => (v == null ? "" : String(v)).trim();
const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(str) : str(v).split(",").map((s) => s.trim())).filter(Boolean);

/** Turns one raw object (form payload, backup entry or hand-written JSON) into an Application, or null. */
export function toApplication(raw: unknown): Application | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const name = str(r.name);
  const email = str(r.email).toLowerCase();
  if (!name || !email) return null;
  const status = (["PENDING", "APPROVED", "WAITLISTED", "REJECTED"] as const).find((s) => s === str(r.status).toUpperCase()) ?? "PENDING";
  return {
    ref: str(r.ref) || `TAIC-APP-${(str(r.submittedAt) || new Date().toISOString()).slice(0, 10).replace(/-/g, "")}-${email.replace(/[^a-z0-9]/gi, "").slice(0, 4).toUpperCase().padEnd(4, "X")}`,
    name,
    email,
    phone: str(r.phone),
    program: str(r.program),
    semester: str(r.semester),
    departments: list(r.departments).map(departmentSlug),
    skills: list(r.skills),
    motivation: str(r.motivation),
    submittedAt: str(r.submittedAt) || new Date().toISOString(),
    status,
    notes: str(r.notes) || undefined,
    reviewedAt: str(r.reviewedAt) || undefined,
    memberId: str(r.memberId) || undefined,
  };
}

/** Accepts a single application, an array, a backup file, or text that contains a JSON block (e.g. an email body). */
export function parseApplications(text: string): Application[] {
  let data: unknown;
  const trimmed = text.trim();
  try {
    data = JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1) return [];
    try {
      data = JSON.parse(trimmed.slice(start, end + 1));
    } catch {
      return [];
    }
  }
  const items: unknown[] = Array.isArray(data) ? data : data && typeof data === "object" && Array.isArray((data as { applications?: unknown }).applications) ? (data as { applications: unknown[] }).applications : [data];
  return items.map(toApplication).filter((a): a is Application => Boolean(a));
}

/** Backup file may also carry members. */
export function parseBackup(text: string): { applications: Application[]; members: StoredMember[] } {
  try {
    const d = JSON.parse(text) as Partial<ClubStore>;
    return { applications: (d.applications ?? []).map(toApplication).filter((a): a is Application => Boolean(a)), members: (d.members ?? []) as StoredMember[] };
  } catch {
    return { applications: parseApplications(text), members: [] };
  }
}

/* ---------- exporting ---------- */

export function toPublicRegistry(store: ClubStore): Registry {
  const members: RegistryMember[] = store.members
    .map(({ memberId, ref, name, program, departments, position, status, joinedOn, validUntil }) => ({ memberId, ref, name, program, departments, position, status, joinedOn, validUntil }))
    .sort((a, b) => a.memberId.localeCompare(b.memberId));
  const decisions = store.applications
    .filter((a) => a.status !== "APPROVED")
    .map((a) => ({ ref: a.ref, status: a.status as DecisionStatus, decidedOn: (a.reviewedAt ?? a.submittedAt).slice(0, 10) }))
    .sort((a, b) => a.ref.localeCompare(b.ref));
  return { publishedAt: new Date().toISOString().slice(0, 10), members, decisions };
}

export function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  const cell = (v: unknown) => {
    const s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\n");
}

export function downloadText(filename: string, content: string, type = "application/json") {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const applicationDepartmentNames = (a: { departments: string[] }) => a.departments.map(departmentName).join(", ");
