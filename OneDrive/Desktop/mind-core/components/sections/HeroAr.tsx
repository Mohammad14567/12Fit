"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GlowButton } from "@/components/ui/primitives";
import { glide } from "@/lib/motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const arcOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);
  const arcY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const headline: ReactNode[] = [
    "نبني البرمجيات",
    <>
      التي <span className="text-aurora">ينتظرها</span>
    </>,
    "المستقبل.",
  ];

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden px-6"
    >
      {/* ----- The eclipse horizon ----- */}
      <motion.div
        aria-hidden
        style={{ opacity: arcOpacity, y: arcY }}
        className="absolute inset-x-0 bottom-0 top-0"
      >
        <Eclipse />
      </motion.div>

      {/* Headline layer — floats in the dark above the horizon */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mt-[24svh] flex flex-col items-center text-center md:mt-[26svh]"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: glide, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white/[0.04] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-beam shadow-[0_0_8px_rgba(156,194,255,0.9)]" />
          </span>
          <span className="label !text-frost/80">مايند كور · استوديو برمجيات</span>
        </motion.p>

        <h1 className="display lit mt-7 text-5xl font-semibold leading-[1.04] sm:text-6xl md:text-[5rem]">
          {headline.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: glide, delay: 0.25 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: glide, delay: 0.75 }}
          className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-mist sm:text-lg"
        >
          منتجات رقمية، وأنظمة ذكاء اصطناعي، وأتمتة — مصمّمة ومهندسة
          بدقة الشركات التي تتمنى أنها بنت برمجياتك.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: glide, delay: 0.9 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GlowButton href="#contact">ابدأ مشروعاً</GlowButton>
          <GlowButton href="#work" primary={false}>
            شاهد الأعمال
          </GlowButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue — a falling point of light */}
      <motion.div
        aria-hidden
        style={{ opacity: textOpacity }}
        className="absolute bottom-10 left-1/2 z-10 h-12 w-px -translate-x-1/2 overflow-hidden bg-hairline"
      >
        <motion.span
          className="absolute left-0 top-0 h-4 w-px bg-beam"
          animate={{ y: [-16, 56] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function Eclipse() {
  const circle =
    "absolute left-1/2 top-[78%] aspect-square w-[240vw] -translate-x-1/2 rounded-full md:top-[88%] md:w-[170vw]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
      className="absolute inset-0"
    >
      <div
        className="absolute left-1/2 top-[78%] h-[46vh] w-[150vw] -translate-x-1/2 -translate-y-[58%] md:top-[88%] md:w-[110vw]"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 100%, rgba(94,139,255,0.5) 0%, rgba(142,123,255,0.18) 45%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute left-1/2 top-[78%] h-[14vh] w-[70vw] -translate-x-1/2 -translate-y-[62%] md:top-[88%] md:w-[44vw]"
        style={{
          background:
            "radial-gradient(50% 100% at 50% 100%, rgba(232,236,246,0.5) 0%, rgba(156,194,255,0.35) 40%, transparent 72%)",
          filter: "blur(34px)",
        }}
      />

      <div
        className={circle}
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(13,17,31,1) 0%, #05060A 18%)",
        }}
      />

      <div
        className={circle}
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(94,139,255,0.8) 38%, rgba(200,220,255,1) 50%, rgba(142,123,255,0.7) 64%, transparent 90%)",
          WebkitMask:
            "radial-gradient(closest-side, transparent calc(100% - 38px), #000 calc(100% - 22px), #000 100%)",
          mask: "radial-gradient(closest-side, transparent calc(100% - 38px), #000 calc(100% - 22px), #000 100%)",
          filter: "blur(16px)",
        }}
      />

      <div
        className={circle}
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(94,139,255,0.7) 36%, #E8ECF6 50%, rgba(142,123,255,0.7) 66%, transparent 90%)",
          WebkitMask:
            "radial-gradient(closest-side, transparent calc(100% - 2.5px), #000 calc(100% - 1px), #000 100%)",
          mask: "radial-gradient(closest-side, transparent calc(100% - 2.5px), #000 calc(100% - 1px), #000 100%)",
        }}
      />
    </motion.div>
  );
}
