"use client";

import { usePathname } from "next/navigation";

const APP_PREFIXES = ["/admin"];

/** Renders the public site chrome (navbar, footer…) only outside the platform dashboards. */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isApp) return null;
  return <>{children}</>;
}
