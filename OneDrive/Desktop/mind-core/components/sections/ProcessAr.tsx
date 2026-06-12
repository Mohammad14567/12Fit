"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { process } from "@/content/site-ar";
import { SectionHeader, Reveal } from "@/components/ui/primitives";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const beamScale = useTransform(beam, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative px-6 py-40 md:py-56">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="٠٢ · المنهج"
          title={
            <>
              خط مستقيم من
              <br />
              الفكرة إلى الإشعال.
            </>
          }
          lede="أربع مراحل، لا مراسم. الشعاع أدناه يمتلئ مع تقدم العمل — مرر، وشاهد المشروع يتألق."
        />

        <div ref={ref} className="relative mt-24">
          <div
            aria-hidden
            className="absolute right-[7px] top-0 h-full w-px bg-hairline md:right-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: beamScale }}
            className="absolute right-[7px] top-0 h-full w-px origin-top bg-gradient-to-b from-beam via-core to-pulse md:right-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: beamScale }}
            className="absolute right-[5px] top-0 h-full w-[5px] origin-top bg-gradient-to-b from-beam/40 via-core/30 to-pulse/30 blur-[6px] md:right-[calc(50%-2px)]"
          />

          <ol className="space-y-24 md:space-y-32" role="list">
            {process.map((step, i) => {
              const right = i % 2 === 0;
              return (
                <li key={step.phase} className="relative md:grid md:grid-cols-2 md:gap-20">
                  <PhaseNode index={i} total={process.length} progress={beam} />

                  <Reveal
                    delay={0.5}
                    className={`pr-12 md:pr-0 ${
                      right
                        ? "md:col-start-2 md:pl-16 md:text-left"
                        : "md:col-start-1 md:pr-16 md:text-right"
                    }`}
                  >
                    <p className="label">
                      المرحلة {i + 1} — {step.phase}
                    </p>
                    <h3 className="display mt-3 text-2xl font-semibold sm:text-3xl">
                      {step.title}
                    </h3>
                    <p
                      className={`mt-4 max-w-line text-pretty leading-relaxed text-mist ${
                        right ? "" : "md:mr-auto"
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
      className="absolute right-0 top-1.5 z-10 md:right-1/2 md:translate-x-1/2"
    >
      <motion.span
        style={{ opacity: lit, scale: haloScale }}
        className="absolute -inset-3 rounded-full bg-core/40 blur-md"
      />
      <motion.span
        style={{ opacity: lit }}
        className="relative block h-[15px] w-[15px] rounded-full border border-beam bg-void"
      >
        <span className="absolute inset-[3px] rounded-full bg-beam" />
      </motion.span>
      <span className="absolute inset-0 -z-10 block h-[15px] w-[15px] rounded-full border border-mist/30 bg-void" />
    </span>
  );
}
