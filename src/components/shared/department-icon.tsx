import { BrainCircuit, Code2, ShieldCheck, Braces, Megaphone, Handshake, type LucideProps } from "lucide-react";
import type { Department } from "@/data/departments";

const map = { BrainCircuit, Code2, ShieldCheck, Braces, Megaphone, Handshake } as const;

export function DepartmentIcon({ icon, ...props }: { icon: Department["icon"] } & LucideProps) {
  const Icon = map[icon];
  return <Icon aria-hidden {...props} />;
}
