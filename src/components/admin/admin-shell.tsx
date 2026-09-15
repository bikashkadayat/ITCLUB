"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SidebarNav, type NavItem } from "@/components/dashboard/sidebar-nav";

const items: NavItem[] = [
  { label: "Overview", href: "/admin", icon: "LayoutDashboard", exact: true },
  { label: "Applications", href: "/admin/applications", icon: "Inbox" },
  { label: "Members", href: "/admin/members", icon: "Users" },
  { label: "Data & publishing", href: "/admin/data", icon: "BookOpen" },
];

/**
 * Committee tool shell. This is a client-side administration tool: everything
 * it shows is stored in this browser (localStorage). It has no login because
 * there is no server to protect anything — the private data never leaves the
 * committee member's own device unless they export it.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const nav = [{ heading: "Committee tool", items }, { heading: "Website", items: [{ label: "Member area", href: "/members", icon: "User" as const }, { label: "Membership card", href: "/membership/card", icon: "Shield" as const }] }];
  return (
    <div className="min-h-dvh bg-muted/30 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-border/70 bg-card print:hidden lg:flex lg:flex-col">
        <div className="flex h-16 items-center border-b border-border/70 px-5"><Logo /></div>
        <div className="flex-1 overflow-y-auto px-3 py-4"><SidebarNav groups={nav} /></div>
        <div className="border-t border-border/70 p-4 text-xs text-muted-foreground">
          <p className="font-medium text-foreground/80">Executive Committee tool</p>
          <p className="mt-0.5">Runs in this browser only.</p>
          <Link href="/" className="mt-2 inline-block text-primary hover:underline">← Back to website</Link>
        </div>
      </aside>
      <div className="flex min-h-dvh min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border/70 bg-background/80 px-4 backdrop-blur print:hidden sm:px-6">
          <div className="flex items-center gap-3 lg:hidden"><Logo /></div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold">Committee tool</p>
            <p className="text-xs text-muted-foreground">Tech &amp; AI Innovation Club</p>
          </div>
          <div className="flex items-center gap-2"><ThemeToggle /></div>
        </header>
        <div className="border-b border-border/70 bg-card px-3 py-2 print:hidden lg:hidden"><SidebarNav groups={nav} horizontal /></div>
        <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-900 print:hidden dark:text-amber-200 sm:px-6">
          <p className="flex items-start gap-2"><Info className="mt-0.5 size-3.5 shrink-0" aria-hidden /> Client-side tool, not a secure multi-user system. Applications and member records live in this browser&apos;s storage. Export a backup after every session and only use this on a committee member&apos;s own device.</p>
        </div>
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
