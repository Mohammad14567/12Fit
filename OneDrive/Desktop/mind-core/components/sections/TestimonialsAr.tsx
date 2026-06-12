"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/content/site-ar";
import { SectionHeader } from "@/components/ui/primitives";
import { glide } from "@/lib/motion";

const HOLD_MS = 7000;

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const t = testimonials[i];

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => setI((v) => (v + 1) % testimonials.length), HOLD_MS);
    return () => clearTimeout(id);
  }, [i, paused, reduced]);

  return (
    <section
      id="voices"
      className="relative px-6 py-40 md:py-52"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div aria-hidden className="bloom-soft absolute left-1/2 top-1/2 h-[28rem] w-[44rem] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeader eyebrow="٠٥ · أصوات" title="كيف يبدو الأمر، من جهتهم." align="center" />

        <div className="glass edge-light scanlines relative mt-16 overflow-hidden rounded-3xl px-8 py-14 sm:px-14 sm:py-16">
          <span
            aria-hidden
            className="display pointer-events-none absolute -top-6 right-6 select-none text-[9rem] leading-none text-beam/10 sm:right-10"
          >
            "
          </span>

          <div className="relative min-h-[15rem] text-center sm:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: glide }}
              >
                <blockquote className="display text-balance text-2xl font-medium leading-snug text-frost sm:text-[1.75rem]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex flex-col items-center gap-1.5">
                  <span className="h-px w-8 bg-gradient-to-r from-transparent via-beam to-transparent" />
                  <span className="mt-2 block text-sm font-medium text-frost">
                    {t.name}
                  </span>
                  <span className="label block normal-case tracking-normal">
                    {t.role}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-3">
          {testimonials.map((item, idx) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={idx === i}
              aria-label={`عرض شهادة من ${item.name}`}
              onClick={() => setI(idx)}
              className="group relative h-6 w-12"
            >
              <span className="absolute inset-x-0 top-[11.5px] h-px bg-mist/25 transition-colors group-hover:bg-mist/50" />
              {idx === i && (
                <motion.span
                  layoutId="voice-indicator-ar"
                  className="absolute inset-x-0 top-[11.5px] h-px bg-beam shadow-[0_0_10px_rgba(156,194,255,0.9)]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
