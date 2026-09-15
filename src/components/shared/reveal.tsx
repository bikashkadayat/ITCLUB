"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span";
}

export function Reveal({ children, className, delay = 0, y = 24, once = true, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
// Reduced motion: no stagger, no movement, instant reveal. Variants must stay defined,
// otherwise the server-rendered "hidden" style is never animated away and items stay invisible.
const reducedContainerVariants: Variants = { hidden: {}, show: { transition: { staggerChildren: 0, delayChildren: 0 } } };
const reducedItemVariants: Variants = { hidden: { opacity: 0, y: 0 }, show: { opacity: 1, y: 0, transition: { duration: 0 } } };

export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "ul" | "ol" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      variants={reduce ? reducedContainerVariants : containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp variants={reduce ? reducedItemVariants : itemVariants} className={className}>
      {children}
    </Comp>
  );
}
