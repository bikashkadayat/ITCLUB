"use client";

import { useEffect } from "react";

/**
 * GitHub Pages serves 404.html for paths that have no file. QR codes and
 * shared links use pretty URLs such as /verify/TAIC-2026-0001, which we map to
 * the static page that reads the ID from the query string.
 */
const PATTERNS: [RegExp, string][] = [
  [/^\/verify\/([^/]+)\/?$/, "/verify/?id="],
  [/^\/members\/([^/]+)\/?$/, "/members/?id="],
  [/^\/membership\/card\/([^/]+)\/?$/, "/membership/card/?id="],
  [/^\/membership\/status\/([^/]+)\/?$/, "/membership/status/?ref="],
];

export function RouteRecovery() {
  useEffect(() => {
    const path = window.location.pathname;
    for (const [re, target] of PATTERNS) {
      const m = path.match(re);
      if (m && m[1] !== "verify" && m[1] !== "card" && m[1] !== "status") {
        window.location.replace(`${target}${encodeURIComponent(m[1])}`);
        return;
      }
    }
  }, []);
  return null;
}
