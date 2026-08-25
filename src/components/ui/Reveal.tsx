"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none" | "zoom";

const offset: Record<Direction, { x: number; y: number; scale?: number }> = {
  up: { x: 0, y: 44 },
  down: { x: 0, y: -44 },
  left: { x: 44, y: 0 },
  right: { x: -44, y: 0 },
  none: { x: 0, y: 0 },
  zoom: { x: 0, y: 0, scale: 0.92 },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
  amount = 0.25,
  as = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
  as?: "div" | "li" | "span";
}) {
  const o = offset[direction];
  const variants: Variants = {
    hidden: { opacity: 0, x: o.x, y: o.y, scale: o.scale ?? 1 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, delay, ease: [0.65, 0, 0.35, 1] },
    },
  };

  const MotionTag = as === "li" ? motion.li : as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}
