"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { nav } from "@/content/site-ar";

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(5,6,10,0)", "rgba(5,6,10,0.65)"]);
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(168,190,255,0)", "rgba(168,190,255,0.10)"]
  );

  return (
    <motion.nav
      style={{ backgroundColor: bg, borderColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
      aria-label="Main"
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          {/* The mark: a miniature core */}
          <span className="relative block h-2 w-2 rounded-full bg-beam">
            <span className="absolute -inset-1 rounded-full bg-core/40 blur-[5px]" />
          </span>
          <span className="font-display text-[12px] font-semibold tracking-tight text-frost">
            مايند كور
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] font-medium text-mist transition-colors duration-300 hover:text-frost"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="rounded-full border border-hairline bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-frost transition-all duration-300 hover:border-beam/40 hover:bg-white/[0.07]"
            aria-label="Switch to English"
          >
            EN
          </a>
          <a
            href="#contact"
            className="rounded-full border border-hairline bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-frost transition-all duration-300 hover:border-beam/40 hover:bg-white/[0.07]"
          >
            ابدأ مشروعاً
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
