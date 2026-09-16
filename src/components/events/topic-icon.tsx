import { Code2, ShieldCheck, BrainCircuit, Network, Briefcase, GraduationCap, Leaf, Heart, Zap, Accessibility, Users, Smartphone, BookOpen, Trophy, Globe, FileText, User } from "lucide-react";
import type { TopicIcon as TopicIconName } from "@/data/events";

const icons = { Code2, ShieldCheck, BrainCircuit, Network, Briefcase, GraduationCap, Leaf, Heart, Zap, Accessibility, Users, Smartphone, BookOpen, Trophy, Globe, FileText, User };

export function TopicIcon({ icon, className }: { icon: TopicIconName; className?: string }) {
  const Icon = icons[icon];
  return <Icon className={className} aria-hidden />;
}
