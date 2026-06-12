"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/content/site";
import { SectionHeader } from "@/components/ui/primitives";
import { glide } from "@/lib/motion";

/**
 * Services as an instrument, not cards.
 *
 * The left column is a selector; the right is a "terminal" whose light, copy,
 * and output re-render for the selected service. Hovering or focusing a
 * service runs a new session — you operate the section like a device.
 */
export default function Services() {
  const [active, setActive] = useState<(typeof services)[number]>(services[0]);

  return (
    <section id="services" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="01 · Capabilities"
          title={
            <>
              Four disciplines.
              <br />
              One standard of craft.
            </>
          }
          lede="Move across them — each capability is a different way of pointing the same obsession at your problem."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          {/* Selector */}
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
                    className="group flex w-full items-baseline gap-4 py-5 text-left transition-colors duration-300"
                  >
                    <span
                      className={`font-mono text-[11px] transition-colors duration-300 ${
                        isActive ? "text-beam" : "text-mist/50"
                      }`}
                    >
                      {s.index}
                    </span>
                    <span className="flex-1">
                      <span
                        className={`display block text-xl font-semibold transition-colors duration-300 sm:text-2xl ${
                          isActive ? "text-frost" : "text-mist/60 group-hover:text-mist"
                        }`}
                      >
                        {s.name}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`h-1 w-1 rounded-full transition-all duration-500 ${
                        isActive
                          ? s.pulse
                            ? "bg-pulse shadow-[0_0_10px_rgba(142,123,255,0.9)]"
                            : "bg-beam shadow-[0_0_10px_rgba(156,194,255,0.9)]"
                          : "bg-mist/20"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Terminal */}
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
      {/* Traveling glows — follow the rounded perimeter via CSS motion path.
          offset-path makes corners smooth by definition: speed and tangent
          are continuous across the entire rect, including the rounded turns. */}
      <span aria-hidden className="orbit-line orbit-blue" />
      <span aria-hidden className="orbit-line orbit-violet" />

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
          className="relative z-10 flex h-full flex-col px-5 py-5 text-[12px] leading-relaxed sm:px-6 sm:py-6"
        >
          {/* run the manifest */}
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

          {/* list the facets */}
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
                className="flex items-center gap-2 text-frost/85"
              >
                <span aria-hidden style={{ color: `rgb(${accent})` }}>
                  ▸
                </span>
                {f}
              </motion.li>
            ))}
          </ul>

          {/* live prompt */}
          <p className="mt-5 flex items-center text-mist/60">
            <span className="text-beam">›</span>
            <span className="caret ml-1.5" aria-hidden />
          </p>

          {/* Copyright footer */}
          <div className="mt-auto flex items-center justify-between border-t border-hairline pt-4 text-[10px] text-mist/45">
            <span>© Mind Core — All rights reserved</span>
            <span className="tracking-label">v1.0 · secure</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
  );
}
