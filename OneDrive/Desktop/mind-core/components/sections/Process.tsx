"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { process } from "@/content/site";
import { SectionHeader, Reveal } from "@/components/ui/primitives";

/**
 * Process — a beam of light is drawn down the spine of the timeline as you
 * scroll. Each phase node ignites when the beam reaches it. The metaphor is
 * literal: the project gains light as it moves through the studio.
 */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const beamScale = useTransform(beam, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="02 · Method"
          title={
            <>
              A straight line from
              <br />
              idea to ignition.
            </>
          }
          lede="Four phases, no ceremony. The beam below fills as the work does — scroll, and watch the project come to light."
        />

        <div ref={ref} className="relative mt-16">
          {/* Spine */}
          <div
            aria-hidden
            className="absolute left-[7px] top-0 h-full w-px bg-hairline md:left-1/2"
          />
          {/* The drawn beam */}
          <motion.div
            aria-hidden
            style={{ scaleY: beamScale }}
            className="absolute left-[7px] top-0 h-full w-px origin-top bg-gradient-to-b from-beam via-core to-pulse md:left-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: beamScale }}
            className="absolute left-[5px] top-0 h-full w-[5px] origin-top bg-gradient-to-b from-beam/40 via-core/30 to-pulse/30 blur-[6px] md:left-[calc(50%-2px)]"
          />

          <ol className="space-y-16 md:space-y-24" role="list">
            {process.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li key={step.phase} className="relative md:grid md:grid-cols-2 md:gap-20">
                  {/* Node */}
                  <PhaseNode index={i} total={process.length} progress={beam} />

                  <Reveal
                    delay={0.5}
                    className={`pl-12 md:pl-0 ${
                      left
                        ? "md:col-start-1 md:pr-16 md:text-right"
                        : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <p className="label">
                      Phase {i + 1} — {step.phase}
                    </p>
                    <h3 className="display mt-2 text-xl font-semibold sm:text-2xl">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 max-w-line text-pretty text-sm leading-relaxed text-mist ${
                        left ? "md:ml-auto" : ""
                      }`}
                    >
                      {step.body}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** A node that ignites when the beam passes it. */
function PhaseNode({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const threshold = (index + 0.5) / total;
  const lit = useTransform(progress, [threshold - 0.06, threshold], [0, 1]);
  const haloScale = useTransform(lit, [0, 1], [0.4, 1]);

  return (
    <span
      aria-hidden
      className="absolute left-0 top-1 z-10 md:left-1/2 md:-translate-x-1/2"
    >
      <motion.span
        style={{ opacity: lit, scale: haloScale }}
        className="absolute -inset-2 rounded-full bg-core/40 blur-sm"
      />
      <motion.span
        style={{ opacity: lit }}
        className="relative block h-[11px] w-[11px] rounded-full border border-beam bg-void"
      >
        <span className="absolute inset-[2px] rounded-full bg-beam" />
      </motion.span>
      {/* unlit state ring underneath */}
      <span className="absolute inset-0 -z-10 block h-[11px] w-[11px] rounded-full border border-mist/30 bg-void" />
    </span>
  );
}
