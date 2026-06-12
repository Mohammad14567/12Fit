"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/content/site-ar";
import { SectionHeader } from "@/components/ui/primitives";
import { glide } from "@/lib/motion";

export default function Services() {
  const [active, setActive] = useState<(typeof services)[number]>(services[0]);

  return (
    <section id="services" className="relative px-6 py-40 md:py-56">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="٠١ · القدرات"
          title={
            <>
              أربع تخصصات.
              <br />
              معيار واحد للبراعة.
            </>
          }
          lede="تنقل بينها — كل قدرة هي طريقة مختلفة لتوجيه نفس الهوس لمشكلتك."
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <ul className="flex flex-col" role="list">
            {services.map((s) => {
              const isActive = active.id === s.id;
              return (
                <li key={s.id} className="border-b border-hairline first:border-t">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(s)}
                    onFocus={() => setActive(s)}
                    onClick={() => setActive(s)}
                    aria-pressed={isActive}
                    className="group flex w-full items-baseline gap-5 py-7 text-right transition-colors duration-300"
                  >
                    <span
                      className={`font-mono text-xs transition-colors duration-300 ${
                        isActive ? "text-beam" : "text-mist/50"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`display block text-2xl font-semibold transition-colors duration-300 sm:text-3xl ${
                          isActive ? "text-frost" : "text-mist/60 group-hover:text-mist"
                        }`}
                      >
                        {s.name}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${
                        isActive
                          ? s.pulse
                            ? "bg-pulse shadow-[0_0_14px_rgba(142,123,255,0.9)]"
                            : "bg-beam shadow-[0_0_14px_rgba(156,194,255,0.9)]"
                          : "bg-mist/20"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <Terminal active={active} />
        </div>
      </div>
    </section>
  );
}

function Terminal({ active }: { active: (typeof services)[number] }) {
  const accent = active.pulse ? "142,123,255" : "94,139,255";

  return (
    <div className="relative">
      {/* Traveling glows — thin lines orbiting the frame, rotating at corners */}
      {/* Blue line — clockwise from top-right */}
      <motion.div
        aria-hidden
        className="absolute"
        style={{
          width: 2,
          height: 36,
          borderRadius: 9999,
          background: "linear-gradient(180deg, transparent, rgba(156,194,255,0.95), transparent)",
          boxShadow: "0 0 10px 2px rgba(156,194,255,0.55)",
        }}
        animate={{
          top: ["0%", "100%", "100%", "100%", "100%", "0%", "0%", "0%", "0%"],
          left: ["100%", "100%", "100%", "0%", "0%", "0%", "0%", "100%", "100%"],
          rotate: [0, 0, 90, 90, 180, 180, 270, 270, 360],
          x: [0, 0, 0, -2, -2, -2, 0, 0, 0],
          y: [-17, -17, -17, -17, -17, -17, -19, -19, -17],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 0.53, 0.68, 0.71, 0.86, 0.89, 0.97, 1],
        }}
      />
      {/* Violet line — counter-clockwise from bottom-left */}
      <motion.div
        aria-hidden
        className="absolute"
        style={{
          width: 2,
          height: 36,
          borderRadius: 9999,
          background: "linear-gradient(180deg, transparent, rgba(142,123,255,0.95), transparent)",
          boxShadow: "0 0 10px 2px rgba(142,123,255,0.55)",
        }}
        animate={{
          top: ["100%", "0%", "0%", "0%", "0%", "100%", "100%", "100%", "100%"],
          left: ["0%", "0%", "0%", "100%", "100%", "100%", "100%", "0%", "0%"],
          rotate: [0, 0, 90, 90, 180, 180, 270, 270, 360],
          x: [-2, -2, 0, 0, 0, 0, 0, -2, -2],
          y: [-17, -17, -19, -19, -17, -17, -17, -17, -17],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 0.53, 0.68, 0.71, 0.86, 0.89, 0.97, 1],
        }}
      />

      <div
        className="glass edge-light edge-sweep scanlines group relative min-h-[20rem] overflow-hidden rounded-xl font-mono"
        style={{ boxShadow: `0 0 0 1px rgba(${accent},0.08), 0 20px 60px -30px rgba(${accent},0.5)` }}
      >
        {/* Blueprint grid behind the type */}
      <div aria-hidden className="tech-grid absolute inset-0 opacity-40" />

      {/* Title bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-pulse/70 shadow-[0_0_6px_rgba(142,123,255,0.7)]" />
          <span className="h-2 w-2 rounded-full bg-core/70 shadow-[0_0_6px_rgba(94,139,255,0.7)]" />
          <span className="h-2 w-2 rounded-full bg-beam/70 shadow-[0_0_6px_rgba(156,194,255,0.7)]" />
        </span>
        <span className="text-[10px] text-mist/70">
          mindcore@core: <span className="text-beam/80">~/capabilities/{active.id}</span>
        </span>
        <span className="text-[10px] tracking-label text-mist/40">{active.index}</span>
      </div>

      {/* Output */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: glide }}
          className="relative z-10 flex h-full flex-col px-5 py-5 text-[12px] leading-relaxed sm:px-6 sm:py-6 text-right"
        >
          <p className="text-mist/60">
            <span className="text-beam">›</span> cat {active.id}.manifest
          </p>

          <h3 className="display mt-4 text-xl font-semibold tracking-tight text-frost sm:text-2xl">
            {active.name}
          </h3>
          <p className="mt-1.5" style={{ color: `rgb(${accent})` }}>
            {active.tagline}
          </p>
          <p className="mt-3 max-w-line text-pretty leading-relaxed text-mist">
            {active.detail}
          </p>

          <p className="mt-5 text-mist/60">
            <span className="text-beam">›</span> ls ./{active.id}
          </p>
          <ul className="mt-2 space-y-1" role="list">
            {active.facets.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: glide, delay: 0.12 + i * 0.07 }}
                className="flex items-center gap-2 text-frost/85 flex-row-reverse"
              >
                <span aria-hidden style={{ color: `rgb(${accent})` }}>
                  ▸
                </span>
                {f}
              </motion.li>
            ))}
          </ul>

          <p className="mt-5 flex items-center justify-end text-mist/60">
            <span className="caret ml-1.5" aria-hidden />
            <span className="text-beam">›</span>
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4 text-[10px] text-mist/45">
            <span className="tracking-label">v1.0 · secure</span>
            <span>© Mind Core — All rights reserved</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
    </div>
  );
}
