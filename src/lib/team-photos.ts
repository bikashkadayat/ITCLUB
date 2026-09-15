import fs from "node:fs";
import path from "node:path";
import { committee, type CommitteeMember } from "@/data/committee";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const dir = path.join(process.cwd(), "public", "images", "team");
let cache: Map<string, string | undefined> | null = null;

const publicFileExists = (url: string) => fs.existsSync(path.join(process.cwd(), "public", url.replace(/^\//, "")));

/**
 * Resolves a committee member's portrait at build time: an explicit `photo`
 * path is used only if the file really exists under public/ (otherwise the
 * initials avatar is shown instead of a broken image); without an explicit
 * path, `/images/team/<id>.<ext>` is picked up automatically.
 */
export function teamPhoto(id: string, explicit?: string): string | undefined {
  if (explicit) {
    if (!explicit.startsWith("/") || publicFileExists(explicit)) return explicit;
    console.warn(`[team-photos] ${explicit} not found in public/ — showing initials for ${id}`);
  }
  // Only memoise in production; in dev, newly dropped files should show up on the next request.
  if (!cache || process.env.NODE_ENV !== "production") cache = new Map();
  if (cache.has(id)) return cache.get(id);
  let found: string | undefined;
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${id}.${ext}`))) {
      found = `/images/team/${id}.${ext}`;
      break;
    }
  }
  cache.set(id, found);
  return found;
}

/** Committee list with real photos filled in wherever a file exists. */
export function committeeWithPhotos(): CommitteeMember[] {
  return committee.map((m) => ({ ...m, photo: teamPhoto(m.id, m.photo) }));
}
