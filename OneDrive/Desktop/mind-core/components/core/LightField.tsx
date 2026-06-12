"use client";

import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useCursorField } from "@/lib/motion";

/**
 * A faint field of light that travels with the cursor across the whole page.
 * Fixed, pointer-events-none, transform-only — one element, near-zero cost.
 * The effect: the visitor carries a lamp through a dark, expensive room.
 */
export default function LightField() {
  const reduced = useReducedMotion();
  const { x, y } = useCursorField();

  const left = useTransform(x, (v) => `${(v + 0.5) * 100}%`);
  const top = useTransform(y, (v) => `${(v + 0.5) * 100}%`);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left,
        top,
        background:
          "radial-gradient(closest-side, rgba(156,194,255,0.05), rgba(94,139,255,0.025) 45%, transparent 70%)",
      }}
    />
  );
}
