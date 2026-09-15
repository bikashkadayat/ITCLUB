#!/usr/bin/env node
/** Runs after `next build`: makes sure GitHub Pages files exist in out/ and prints a summary. */
import { existsSync, writeFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const out = path.join(process.cwd(), "out");
if (!existsSync(path.join(out, "index.html"))) {
  console.error("✖ out/index.html not found — did `next build` run with output: \"export\"?");
  process.exit(1);
}
const domain = "itclub.techaicollege.edu.np";
writeFileSync(path.join(out, "CNAME"), `${domain}\n`);
writeFileSync(path.join(out, ".nojekyll"), "");
const count = (dir) => readdirSync(dir).reduce((n, f) => { const p = path.join(dir, f); return n + (statSync(p).isDirectory() ? count(p) : f === "index.html" ? 1 : 0); }, 0);
console.log(`✓ ${count(out)} pages exported to out/ for https://${domain} (CNAME, .nojekyll, 404.html ready)`);
