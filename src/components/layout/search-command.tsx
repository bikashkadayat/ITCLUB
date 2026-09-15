"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchIndex, type SearchItem } from "@/data/search-index";
import { cn } from "@/lib/utils";

const SearchContext = createContext<{ open: () => void }>({ open: () => {} });
export const useSearch = () => useContext(SearchContext);

const groupOrder: SearchItem["group"][] = ["Pages", "Departments", "Events", "Projects", "Blog", "Committee", "Constitution", "Documents"];

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = useCallback(
    (item: SearchItem) => {
      setOpen(false);
      if (item.href.endsWith(".pdf")) window.open(item.href, "_blank", "noopener");
      else router.push(item.href);
    },
    [router]
  );

  const grouped = useMemo(
    () =>
      groupOrder
        .map((g) => ({ group: g, items: searchIndex.filter((i) => i.group === g) }))
        .filter((g) => g.items.length),
    []
  );

  const value = useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <SearchContext.Provider value={value}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen} title="Search the site" description="Jump to pages, departments, events, projects, posts and documents." className="sm:max-w-xl">
        <Command loop className="rounded-xl">
        <CommandInput placeholder="Search departments, events, projects, people…" />
        <CommandList className="max-h-[60vh]">
          <CommandEmpty>No results found.</CommandEmpty>
          {grouped.map((g, i) => (
            <div key={g.group}>
              {i > 0 && <CommandSeparator />}
              <CommandGroup heading={g.group}>
                {g.items.map((item) => (
                  <CommandItem key={item.id} value={`${item.title} ${item.subtitle ?? ""} ${item.keywords ?? ""}`} onSelect={() => go(item)}>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate">{item.title}</span>
                      {item.subtitle && <span className="truncate text-xs text-muted-foreground">{item.subtitle}</span>}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
        </Command>
      </CommandDialog>
    </SearchContext.Provider>
  );
}

export function SearchButton({ className, label = true }: { className?: string; label?: boolean }) {
  const { open } = useSearch();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Search the site"
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-full border border-border/80 bg-card/70 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Search className="size-4" aria-hidden />
      {label && (
        <>
          <span className="hidden lg:inline">Search</span>
          <kbd className="hidden rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline">⌘K</kbd>
        </>
      )}
    </button>
  );
}
