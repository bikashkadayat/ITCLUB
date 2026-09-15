"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadMyApplication, type MyApplication } from "@/lib/my-application";

export function SubmittedSummary() {
  const [mine, setMine] = useState<MyApplication | null>(null);
  useEffect(() => setMine(loadMyApplication()), []);
  if (!mine) return null;
  return (
    <div className="mt-6 rounded-2xl border border-primary/30 bg-secondary/50 p-4 text-left text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your application reference</p>
      <p className="mt-1 font-mono text-lg tracking-wider text-primary">{mine.ref}</p>
      <p className="mt-2 text-muted-foreground">Keep it safe. Use it on the <Link href={`/membership/status/?ref=${mine.ref}`} className="text-primary underline underline-offset-4">status page</Link> to follow your application.</p>
    </div>
  );
}
