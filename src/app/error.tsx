"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-32">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-muted-foreground">Something went wrong{error.digest ? ` · ref ${error.digest}` : ""}</p>
        <h1 className="mt-3 text-3xl font-medium">We hit a snag.</h1>
        <p className="mt-3 text-muted-foreground">The page could not be loaded. You can try again, or head back home. If this keeps happening, let the club know through the contact page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <RefreshCw className="size-4" aria-hidden /> Try again
          </button>
          <Link href="/" className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium hover:bg-muted">
            <Home className="size-4" aria-hidden /> Home
          </Link>
        </div>
      </div>
    </section>
  );
}
