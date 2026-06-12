"use client";

import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { work } from "@/content/site-ar";
import { SectionHeader, Reveal, GlowButton } from "@/components/ui/primitives";

export default function Work() {
  return (
    <section id="work" className="relative px-6 py-40 md:py-56">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="٠٣ · أعمال مختارة"
          title={
            <>
              نتائج يمكنك
              <br />
              قياسها في الظلام.
            </>
          }
          lede="أسماء وأرقام، لأن النتائج تقرأ أفضل من لقطات الشاشة. كل مشروع أُطلق للإنتاج وبقي فيه."
        />

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {work.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.5}>
              <ProjectSlab project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex justify-center">
          <GlowButton href="#contact">ابدأ مشروعاً</GlowButton>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectSlab({
  project,
  index,
}: {
  project: (typeof work)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 24 });
  const sy = useSpring(py, { stiffness: 160, damping: 24 });

  const rotateX = useTransform(sy, [0, 1], [4, -4]);
  const rotateY = useTransform(sx, [0, 1], [-4, 4]);
  const spotlight = useTransform(
    [sx, sy] as const,
    ([x, y]) =>
      `radial-gradient(420px 320px at ${(x as number) * 100}% ${
        (y as number) * 100
      }%, rgba(156,194,255,0.10), transparent 70%)`
  );

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const onPointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }}>
      <motion.article
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass edge-light scanlines group relative overflow-hidden rounded-3xl p-9 sm:p-10"
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div
          aria-hidden
          className="tech-grid absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-50"
        />

        <div className="relative" style={{ transform: "translateZ(28px)" }}>
          <div className="flex items-start justify-between">
            <p className="label">{project.field}</p>
            <span className="font-mono text-[11px] tracking-label text-mist/40 transition-colors duration-300 group-hover:text-beam/70">
              {String(index + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
            </span>
          </div>
          <h3 className="display mt-4 text-3xl font-semibold">{project.name}</h3>
          <p className="mt-3 max-w-line text-pretty leading-relaxed text-mist">
            {project.outcome}
          </p>

          <div className="mt-10 flex items-end justify-between border-t border-hairline pt-6">
            <div>
              <span className="display lit block text-5xl font-semibold text-frost">
                {project.stat}
              </span>
              <span className="label mt-2 block">{project.statLabel}</span>
              <span
                aria-hidden
                className="mt-4 block h-px w-28 origin-right bg-gradient-to-l from-beam via-core to-transparent transition-transform duration-700 ease-glide scale-x-50 group-hover:scale-x-100"
              />
            </div>
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-mist/50 transition-all duration-300 ease-glide group-hover:border-beam/50 group-hover:bg-beam/10 group-hover:text-beam"
            >
              ←
            </span>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
