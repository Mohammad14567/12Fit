"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Orb from "@/components/core/Orb";
import { beliefs } from "@/content/site-ar";

export default function Why() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const reduced = useReducedMotion();

  const orbScale = useTransform(scrollYProgress, [0, 0.18, 0.95], [0.55, 1, 1.05]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);

  const ringOpacity = useTransform(scrollYProgress, [0, 0.14, 0.9, 1], [0, 0.5, 0.5, 0]);
  const railProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 26 });
  const railScale = useTransform(railProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="why" aria-label="Why Mind Core" className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <motion.div
          aria-hidden
          style={{ scale: orbScale, opacity: orbOpacity, x: "-50%", y: "-50%" }}
          className="absolute left-1/2 top-1/2"
        >
          <Orb size={520} className="max-md:scale-75 opacity-60" />
        </motion.div>

        <motion.div
          aria-hidden
          style={{ opacity: ringOpacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <motion.div
            className="h-[34rem] w-[34rem] rounded-full border border-beam/15 max-md:scale-[0.7]"
            style={{
              maskImage:
                "conic-gradient(from 0deg, transparent 0deg, #000 60deg, transparent 200deg, #000 280deg, transparent 360deg)",
            }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 m-auto h-[44rem] w-[44rem] rounded-full border border-dashed border-pulse/12 max-md:scale-[0.7]"
            animate={reduced ? undefined : { rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        <div
          aria-hidden
          className="absolute left-7 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-hairline md:block"
        >
          <motion.div
            style={{ scaleY: railScale }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-beam via-core to-pulse"
          />
        </div>

        <motion.p
          style={{ opacity: eyebrowOpacity }}
          className="label absolute top-24 right-1/2 translate-x-1/2"
        >
          ٠٤ · لماذا مايند كور
        </motion.p>

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          {beliefs.map((b, i) => (
            <Belief
              key={b.key}
              belief={b}
              index={i}
              total={beliefs.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Belief({
  belief,
  index,
  total,
  progress,
}: {
  belief: (typeof beliefs)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = 0.12 + (index / total) * 0.82;
  const end = 0.12 + ((index + 1) / total) * 0.82;
  const mid = (start + end) / 2;

  const opacity = useTransform(
    progress,
    [start, start + 0.06, end - 0.06, index === total - 1 ? 1 : end],
    [0, 1, 1, index === total - 1 ? 1 : 0]
  );
  const y = useTransform(progress, [start, mid, end], [44, 0, index === total - 1 ? 0 : -44]);

  return (
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2">
      <motion.div style={{ opacity, y }}>
        <h3 className="display lit text-balance text-3xl font-semibold leading-[1.12] sm:text-4xl md:text-5xl">
          {belief.line}
        </h3>
        <p className="mx-auto mt-6 max-w-line text-pretty leading-relaxed text-mist">
          {belief.sub}
        </p>
      </motion.div>
    </div>
  );
}
