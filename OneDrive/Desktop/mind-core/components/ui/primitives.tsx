"use client";

import { motion } from "framer-motion";
import { rise, stagger } from "@/lib/motion";
import type { ReactNode } from "react";

/** Mono eyebrow + display headline + optional lede — consistent wayfinding. */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      <motion.p variants={rise} className="label">
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={rise}
        className="display lit mt-3 text-balance text-2xl font-semibold leading-[1.06] sm:text-3xl md:text-4xl"
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p
          variants={rise}
          className={`mt-4 max-w-line text-pretty text-xs leading-relaxed text-mist sm:text-sm ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lede}
        </motion.p>
      )}
    </motion.header>
  );
}

/** Scroll-into-view reveal with the house rise. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      variants={rise}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Primary CTA — a capsule of light. Hover raises the inner glow, not the size. */
export function GlowButton({
  children,
  href,
  primary = true,
}: {
  children: ReactNode;
  href: string;
  primary?: boolean;
}) {
  if (!primary) {
    return (
      <a
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-[11px] font-medium text-frost transition-colors duration-300 hover:border-beam/40 hover:text-white"
      >
        {children}
        <span
          aria-hidden
          className="translate-x-0 transition-transform duration-300 ease-glide group-hover:translate-x-0.5"
        >
          →
        </span>
      </a>
    );
  }
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-frost px-5 py-2 text-[11px] font-semibold text-void transition-transform duration-300 ease-glide active:scale-[0.98]"
    >
      {/* light sweeps across the surface on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-core/30 to-transparent transition-transform duration-700 ease-glide group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      <span
        aria-hidden
        className="relative transition-transform duration-300 ease-glide group-hover:translate-x-0.5"
      >
        →
      </span>
      {/* halo */}
      <span
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-full bg-beam/0 blur-xl transition-colors duration-500 group-hover:bg-beam/25"
      />
    </a>
  );
}
