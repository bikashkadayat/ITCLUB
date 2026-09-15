"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchProvider } from "@/components/layout/search-command";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <TooltipProvider>
        <SearchProvider>{children}</SearchProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
