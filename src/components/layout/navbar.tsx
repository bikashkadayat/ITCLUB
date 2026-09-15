"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { primaryNav, type NavEntry } from "@/data/navigation";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "./theme-toggle";
import { SearchButton } from "./search-command";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  const closeMenu = () => setOpen(false);

  const isActive = (entry: NavEntry) => {
    if (entry.href === "/") return pathname === "/";
    const hrefs = [entry.href, ...(entry.children?.map((c) => c.href) ?? [])].filter(Boolean) as string[];
    return hrefs.some((h) => h !== "/" && (pathname === h || pathname.startsWith(h + "/")));
  };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-300", scrolled ? "py-2" : "py-4")}>
      <div className="container-x">
        <div className={cn("flex h-14 items-center justify-between rounded-full border px-3 pl-4 transition-all duration-300 sm:px-4 sm:pl-5", scrolled ? "glass border-border/80 shadow-[0_10px_40px_-20px_var(--glow-blue)]" : "border-transparent bg-transparent")}>
          <Logo priority />

          <nav aria-label="Primary" className="hidden items-center gap-0 lg:flex xl:gap-0.5">
            {primaryNav.map((entry) => (
              <NavItem key={entry.label} entry={entry} active={isActive(entry)} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchButton className="hidden md:inline-flex lg:hidden xl:inline-flex" label={false} />
            <ThemeToggle />
            <Link href="/membership" className="group hidden h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex">
              Become a Member <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger aria-label="Open navigation menu" className="inline-flex size-9 items-center justify-center rounded-full border border-border/80 bg-card/70 text-foreground/80 transition-colors hover:bg-muted lg:hidden">
                <Menu className="size-5" aria-hidden />
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm gap-0 p-0">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <Logo />
                </div>
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">Site navigation links</SheetDescription>
                <nav aria-label="Mobile" className="flex flex-1 flex-col overflow-y-auto px-3 py-3">
                  {primaryNav.map((entry) => (
                    <MobileItem key={entry.label} entry={entry} pathname={pathname} onNavigate={closeMenu} />
                  ))}
                </nav>
                <div className="space-y-3 border-t border-border p-5">
                  <SearchButton className="w-full justify-center" />
                  <Link href="/membership" onClick={closeMenu} className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    Become a Member <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <p className="text-center text-xs text-muted-foreground">Official student club of {siteConfig.college.name}</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavItem({ entry, active }: { entry: NavEntry; active: boolean }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };
  const linkClass = cn("inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] xl:px-3.5 font-medium tracking-[-0.005em] transition-colors", active ? "bg-secondary text-secondary-foreground" : "text-foreground/70 hover:text-foreground");

  if (!entry.children) {
    return (
      <Link href={entry.href!} aria-current={active ? "page" : undefined} className={linkClass}>
        {entry.label}
      </Link>
    );
  }
  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) hide(); }}>
      <Link href={entry.href ?? "#"} aria-haspopup="menu" aria-expanded={open} className={linkClass} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); } if (e.key === "Escape") setOpen(false); }}>
        {entry.label}
        <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-popover p-2 shadow-[0_24px_60px_-24px_var(--glow-blue)]">
              {entry.children.map((c) => (
                <Link key={c.href + c.label} href={c.href} role="menuitem" className="group/item block rounded-xl px-3 py-2.5 transition-colors hover:bg-muted" onClick={() => setOpen(false)}>
                  <span className="flex items-center justify-between text-sm font-medium">
                    {c.label}
                    <ArrowRight className="size-3.5 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" aria-hidden />
                  </span>
                  {c.description && <span className="mt-0.5 block text-xs text-muted-foreground">{c.description}</span>}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile links are real anchors; they close the controlled Sheet on click instead of wrapping Link in SheetClose (which expects a native <button>). */
function MobileItem({ entry, pathname, onNavigate }: { entry: NavEntry; pathname: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const active = entry.href === "/" ? pathname === "/" : Boolean(entry.href && entry.href !== "/" && pathname.startsWith(entry.href));
  if (!entry.children) {
    return (
      <Link href={entry.href!} onClick={onNavigate} aria-current={active ? "page" : undefined} className={cn("rounded-xl px-3 py-3 text-base font-medium hover:bg-muted", active && "bg-secondary text-secondary-foreground")}>
        {entry.label}
      </Link>
    );
  }
  return (
    <div>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-muted", active && "text-primary")}>
        {entry.label}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <div className="mb-1 ml-3 border-l border-border pl-2">
              {entry.href && (
                <Link href={entry.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">
                  Overview
                </Link>
              )}
              {entry.children.map((c) => (
                <Link key={c.href + c.label} href={c.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">
                  {c.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
