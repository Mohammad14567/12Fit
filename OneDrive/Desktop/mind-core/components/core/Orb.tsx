"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useCursorField } from "@/lib/motion";

/**
 * The Core — the page's protagonist.
 *
 * A volumetric ring-orb built entirely from layered gradients and a conic
 * light sweep. No WebGL: every layer animates on transform/opacity, so the
 * effect stays GPU-composited and cheap.
 *
 * `progress` (optional, 0→1) lets a parent dissolve the Core on scroll.
 */

const RING_MASK =
  "radial-gradient(closest-side, transparent 88%, #000 90%, #000 96%, transparent 100%)";
const HAIRLINE_MASK =
  "radial-gradient(closest-side, transparent 98.2%, #000 98.8%)";
const TICK_MASK = "radial-gradient(closest-side, transparent 96.8%, #000 97.6%)";

export default function Orb({
  size = 560,
  progress,
  className = "",
}: {
  size?: number;
  progress?: MotionValue<number>;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const { x, y } = useCursorField();

  // The Core leans gently toward the cursor — depth without gimmick.
  const tx = useTransform(x, (v) => v * 36);
  const ty = useTransform(y, (v) => v * 26);
  const txFar = useTransform(x, (v) => v * 14);
  const tyFar = useTransform(y, (v) => v * 10);

  // Specular highlight slides opposite the cursor, like light on glass.
  const hx = useTransform(x, (v) => `${50 - v * 60}%`);
  const hy = useTransform(y, (v) => `${42 - v * 50}%`);

  const zero = useMotionValue(0);
  const p = progress ?? zero;
  const dissolveScale = useTransform(p, [0, 1], [1, 1.35]);
  const dissolveOpacity = useTransform(p, [0, 0.7], [1, 0]);

  const specular = useTransform(
    [hx, hy] as const,
    ([px, py]) =>
      `radial-gradient(220px 180px at ${px} ${py}, rgba(232,236,246,0.34), transparent 70%)`
  );

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none relative ${className}`}
      style={{
        width: size,
        height: size,
        scale: dissolveScale,
        opacity: dissolveOpacity,
      }}
    >
      {/* Far ambient bloom — fills the room with light */}
      <motion.div
        className="absolute -inset-[30%] rounded-full"
        style={{
          x: reduced ? 0 : txFar,
          y: reduced ? 0 : tyFar,
          background:
            "radial-gradient(closest-side, rgba(94,139,255,0.22), rgba(94,139,255,0.06) 45%, transparent 72%)",
          filter: "blur(40px)",
        }}
      />

      {/* Instrument tick ring — fine graduation marks, like a precision dial */}
      <motion.div
        className="absolute -inset-[6%] rounded-full"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, rgba(156,194,255,0.5) 0deg 0.4deg, transparent 0.4deg 6deg)",
          WebkitMask: TICK_MASK,
          mask: TICK_MASK,
          opacity: 0.35,
        }}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer orbit — a hairline circle carrying a single point of light */}
      <motion.div
        className="absolute -inset-[2.5%] rounded-full"
        style={{ border: "1px solid rgba(156,194,255,0.09)" }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
      >
        <span
          className="absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "#cfe0ff",
            boxShadow:
              "0 0 10px 2px rgba(156,194,255,0.85), 0 0 28px 6px rgba(94,139,255,0.35)",
          }}
        />
      </motion.div>

      {/* Body of the orb */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          x: reduced ? 0 : tx,
          y: reduced ? 0 : ty,
        }}
      >
        {/* Inner volume — deeper falloff so the sphere reads as a solid object */}
        <div
          className="absolute inset-[12%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 30%, rgba(238,242,250,0.58) 0%, rgba(156,194,255,0.20) 28%, rgba(94,139,255,0.10) 48%, rgba(8,11,22,0.92) 76%, rgba(5,6,10,0.98) 100%)",
            boxShadow:
              "inset 0 1px 1px rgba(232,236,246,0.4), inset 0 -36px 70px rgba(94,139,255,0.28), inset 0 24px 60px rgba(156,194,255,0.08)",
          }}
        />

        {/* Core hot spot — the light source inside the glass */}
        <div
          className="absolute inset-[26%] rounded-full mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at 46% 38%, rgba(232,236,246,0.38), rgba(156,194,255,0.16) 42%, transparent 72%)",
            filter: "blur(14px)",
          }}
        />

        {/* Crisp rim hairline — a machined edge under the energy ring */}
        <div
          className="absolute inset-[12%] rounded-full"
          style={{
            background:
              "conic-gradient(from 200deg, rgba(156,194,255,0.06), rgba(156,194,255,0.38) 18%, rgba(142,123,255,0.16) 42%, rgba(156,194,255,0.05) 60%, rgba(156,194,255,0.18) 85%, rgba(156,194,255,0.06))",
            WebkitMask: HAIRLINE_MASK,
            mask: HAIRLINE_MASK,
          }}
        />

        {/* Conic energy ring — the slow sweep of light around the rim */}
        <motion.div
          className="absolute inset-[8%] rounded-full"
          style={{
            background:
              "conic-gradient(from 210deg, transparent 0deg, rgba(232,236,246,0.55) 24deg, rgba(156,194,255,0.9) 44deg, rgba(142,123,255,0.5) 92deg, rgba(142,123,255,0.12) 130deg, transparent 165deg, transparent 360deg)",
            WebkitMask: RING_MASK,
            mask: RING_MASK,
            filter: "blur(0.5px)",
          }}
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        />

        {/* Counter-sweep — a fainter violet pass moving the other way */}
        <motion.div
          className="absolute inset-[8%] rounded-full"
          style={{
            background:
              "conic-gradient(from 40deg, transparent 0deg, rgba(142,123,255,0.32) 46deg, rgba(94,139,255,0.16) 96deg, transparent 150deg, transparent 360deg)",
            WebkitMask: RING_MASK,
            mask: RING_MASK,
            filter: "blur(1px)",
          }}
          animate={reduced ? undefined : { rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />

        {/* Rim glow under the ring */}
        <div
          className="absolute inset-[8%] rounded-full"
          style={{
            boxShadow:
              "0 0 80px 8px rgba(94,139,255,0.28), inset 0 0 40px rgba(156,194,255,0.12)",
          }}
        />

        {/* Specular highlight that tracks the cursor */}
        <motion.div
          className="absolute inset-[12%] rounded-full mix-blend-screen"
          style={{ background: specular }}
        />
      </motion.div>

      {/* Breathing — barely perceptible, like the object is alive */}
      {!reduced && (
        <motion.div
          className="absolute inset-[10%] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(156,194,255,0.10), transparent 70%)",
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
