"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, CalendarDays, FolderGit2, Award, Bell, Shield, BookOpen, Users, UserCheck, Newspaper, Trophy, Mail, Inbox, Building2, BarChart3, Megaphone, LayoutGrid, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const navIcons = { LayoutDashboard, User, CalendarDays, FolderGit2, Award, Bell, Shield, BookOpen, Users, UserCheck, Newspaper, Trophy, Mail, Inbox, Building2, BarChart3, Megaphone, LayoutGrid, PlusCircle };
export type NavIconName = keyof typeof navIcons;

export interface NavItem {
  label: string;
  href: string;
  icon: NavIconName;
  exact?: boolean;
  badge?: number;
}

export function SidebarNav({ groups, horizontal = false }: { groups: { heading?: string; items: NavItem[] }[]; horizontal?: boolean }) {
  const pathname = usePathname();
  const active = (item: NavItem) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(item.href + "/"));
  if (horizontal) {
    return (
      <nav className="no-scrollbar flex gap-1 overflow-x-auto" aria-label="Dashboard">
        {groups.flatMap((g) => g.items).map((item) => {
          const Icon = navIcons[item.icon];
          return (
            <Link key={item.href} href={item.href} className={cn("flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium", active(item) ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted")}>
              <Icon className="size-3.5" aria-hidden /> {item.label}
              {item.badge ? <span className="rounded-full bg-brand-coral px-1.5 text-xs lg:text-[10px] text-white">{item.badge}</span> : null}
            </Link>
          );
        })}
      </nav>
    );
  }
  return (
    <nav className="space-y-5" aria-label="Dashboard">
      {groups.map((g, i) => (
        <div key={i}>
          {g.heading && <p className="mb-1.5 px-3 text-xs lg:text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{g.heading}</p>}
          <ul className="space-y-0.5">
            {g.items.map((item) => {
              const Icon = navIcons[item.icon];
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active(item) ? "page" : undefined} className={cn("flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors", active(item) ? "bg-secondary text-secondary-foreground" : "text-foreground/75 hover:bg-muted hover:text-foreground")}>
                    <Icon className="size-4 shrink-0" aria-hidden />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge ? <span className="rounded-full bg-brand-coral px-1.5 py-0.5 text-xs lg:text-[10px] font-semibold text-white">{item.badge}</span> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
