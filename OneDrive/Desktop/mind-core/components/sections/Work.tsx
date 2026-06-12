"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { work } from "@/content/site";
import { SectionHeader, Reveal, GlowButton } from "@/components/ui/primitives";

/**
 * Work — a curated gallery of outcomes.
 *
 * Each project is a full-width glass slab. The left side carries a bespoke
 * stylized "preview" — a miniature interface that hints at the surface of the
 * product without faking screenshots. The slab tilts gently toward the cursor
 * and a spotlight follows it across the glass.
 */
export default function Work() {
  return (
    <section id="work" className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="03 · Selected work"
          title={
            <>
              Outcomes you can
              <br />
              measure in the dark.
            </>
          }
          lede="Native applications we own end-to-end, and platforms we've built for the people who hire us. Each one shipped, stayed, and moved a number that mattered."
        />

        <div className="mt-16 grid gap-8">
          {work.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.18}>
              <ProjectSlab project={project} index={i} featured />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex justify-center">
          <GlowButton href="#contact">Start a project</GlowButton>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- */

function ProjectSlab({
  project,
  index,
  featured = false,
}: {
  project: (typeof work)[number];
  index: number;
  featured?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 24 });
  const sy = useSpring(py, { stiffness: 160, damping: 24 });

  // ±3° — depth you feel, not a gimmick you watch
  const rotateX = useTransform(sy, [0, 1], [3, -3]);
  const rotateY = useTransform(sx, [0, 1], [-3, 3]);
  const spotlight = useTransform(
    [sx, sy] as const,
    ([x, y]) =>
      `radial-gradient(520px 380px at ${(x as number) * 100}% ${
        (y as number) * 100
      }%, rgba(156,194,255,0.12), transparent 70%)`
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

  const preview = PREVIEWS[project.name] ?? <DefaultPreview />;

  return (
    <div style={{ perspective: 1400 }}>
      <motion.article
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`glass edge-light group relative overflow-hidden rounded-3xl ${
          featured ? "p-6 sm:p-8" : "p-5 sm:p-6"
        }`}
      >
        {/* Pointer spotlight */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div
          className={`relative grid gap-6 ${
            featured ? "md:grid-cols-[5fr_4fr] md:gap-10" : ""
          }`}
          style={{ transform: "translateZ(28px)" }}
        >
          {/* Preview surface */}
          <div
            className={`relative overflow-hidden rounded-2xl border border-hairline bg-carbon/60 ${
              featured ? "min-h-[260px] md:min-h-[320px]" : "min-h-[180px]"
            }`}
          >
            <div aria-hidden className="absolute inset-0 dot-grid opacity-50" />
            <div className="absolute inset-0">{preview}</div>
            <div aria-hidden className="work-sheen" />
            {/* Browser-frame top dots */}
            <div
              aria-hidden
              className="absolute left-3 top-3 flex items-center gap-1"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-pulse/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-core/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-beam/60" />
            </div>
            {/* Index badge */}
            <span className="absolute right-3 top-3 font-mono text-[10px] tracking-label text-mist/50">
              {String(index + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
            </span>
          </div>

          {/* Meta */}
          <div className="relative flex flex-col">
            <p className="label">{project.field}</p>
            <h3
              className={`display mt-3 font-semibold leading-tight text-frost ${
                featured ? "text-3xl md:text-4xl" : "text-2xl"
              }`}
            >
              {project.name}
            </h3>
            <p className="mt-3 max-w-line text-pretty text-sm leading-relaxed text-mist">
              {project.outcome}
            </p>

            <div className="mt-auto pt-8">
              <div className="flex items-end justify-between border-t border-hairline pt-5">
                <div>
                  <span
                    className={`display lit block font-semibold text-frost ${
                      featured ? "text-5xl md:text-6xl" : "text-4xl"
                    }`}
                  >
                    {project.stat}
                  </span>
                  <span className="label mt-2 block">{project.statLabel}</span>
                  <span
                    aria-hidden
                    className="mt-4 block h-px w-28 origin-left scale-x-50 bg-gradient-to-r from-beam via-core to-transparent transition-transform duration-700 ease-glide group-hover:scale-x-100"
                  />
                </div>
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-mist/60 transition-all duration-300 ease-glide group-hover:translate-x-0.5 group-hover:border-beam/50 group-hover:bg-beam/10 group-hover:text-beam"
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Stylized previews — one per project. Pure CSS/SVG, no fake screenshots */
/* -------------------------------------------------------------------- */

const PREVIEWS: Record<string, ReactNode> = {
  "Mind Core": <MindCorePreview />,
  Localis: <LocalisPreview />,
};

/**
 * Localis — a discovery radar for local businesses.
 *
 * The reading: you're at the centre of a quiet city compass. A blue sweep
 * arm rotates around you scanning the neighbourhood; storefronts appear as
 * lettered pins on concentric range rings. A floating card surfaces what
 * the radar just touched — the next coffee, the next table, the next door.
 */
function LocalisPreview() {
  return (
    <div className="absolute inset-0 flex flex-col px-4 pb-3 pt-9">
      {/* HUD header */}
      <div className="flex items-center justify-between text-[9px] font-mono text-mist/60">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-beam" />
          </span>
          Discovering · 1.2 mi
        </span>
        <span className="text-beam">24 places</span>
      </div>

      {/* The radar */}
      <div className="relative mt-2 flex-1 overflow-hidden">
        <svg
          viewBox="0 0 220 160"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="localis-fade" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(156,194,255,0.10)" />
              <stop offset="80%" stopColor="rgba(156,194,255,0)" />
            </radialGradient>
            <linearGradient id="localis-sweep" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(156,194,255,0.55)" />
              <stop offset="100%" stopColor="rgba(156,194,255,0)" />
            </linearGradient>
            <radialGradient id="localis-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(94,139,255,0.35)" />
              <stop offset="100%" stopColor="rgba(94,139,255,0)" />
            </radialGradient>
          </defs>

          {/* soft pool of light at centre */}
          <circle cx="110" cy="80" r="70" fill="url(#localis-fade)" />

          {/* compass crosshair lines */}
          <g stroke="rgba(156,194,255,0.08)" strokeWidth="0.7">
            <line x1="110" y1="0" x2="110" y2="160" strokeDasharray="2 3" />
            <line x1="0" y1="80" x2="220" y2="80" strokeDasharray="2 3" />
            <line x1="20" y1="0" x2="200" y2="160" strokeDasharray="1 4" />
            <line x1="200" y1="0" x2="20" y2="160" strokeDasharray="1 4" />
          </g>

          {/* concentric range rings */}
          {[26, 46, 66].map((r) => (
            <circle
              key={r}
              cx="110"
              cy="80"
              r={r}
              fill="none"
              stroke="rgba(156,194,255,0.18)"
              strokeWidth="0.6"
              strokeDasharray="1.5 3"
            />
          ))}

          {/* compass markers */}
          <g
            fontSize="6"
            fontFamily="monospace"
            fill="rgba(154,163,181,0.55)"
            textAnchor="middle"
          >
            <text x="110" y="6">N</text>
            <text x="110" y="158">S</text>
            <text x="6" y="83">W</text>
            <text x="214" y="83">E</text>
          </g>

          {/* rotating sweep arm */}
          <g>
            <path
              d="M110,80 L176,80 A66,66 0 0,1 156,127 Z"
              fill="url(#localis-sweep)"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 110 80"
                to="360 110 80"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </path>
            <line
              x1="110"
              y1="80"
              x2="176"
              y2="80"
              stroke="#9CC2FF"
              strokeWidth="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 110 80"
                to="360 110 80"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </line>
          </g>

          {/* "you are here" centre + pulse */}
          <circle cx="110" cy="80" r="14" fill="url(#localis-glow)" />
          <circle cx="110" cy="80" r="3" fill="#E8ECF6" />
          <circle
            cx="110"
            cy="80"
            r="3"
            fill="none"
            stroke="#9CC2FF"
            strokeWidth="0.8"
          >
            <animate
              attributeName="r"
              values="3;16"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>

          {/* business pins — letter = category */}
          {[
            { x: 70, y: 50, k: "C" },
            { x: 162, y: 60, k: "R" },
            { x: 150, y: 118, k: "S" },
            { x: 60, y: 116, k: "G" },
            { x: 116, y: 30, k: "B" },
            { x: 50, y: 80, k: "M" },
            { x: 180, y: 100, k: "F" },
          ].map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="8"
                fill="rgba(11,13,20,0.92)"
                stroke="rgba(156,194,255,0.7)"
                strokeWidth="0.8"
              />
              <text
                x={p.x}
                y={p.y + 2.6}
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fill="#9CC2FF"
              >
                {p.k}
              </text>
            </g>
          ))}

          {/* range labels along the rings */}
          <g
            fontSize="5"
            fontFamily="monospace"
            fill="rgba(154,163,181,0.45)"
          >
            <text x="138" y="80" dy="-1">.4 mi</text>
            <text x="158" y="80" dy="-1">.8 mi</text>
            <text x="178" y="80" dy="-1">1.2 mi</text>
          </g>
        </svg>

        {/* Floating "just discovered" card — what the sweep touched last */}
        <div className="absolute bottom-2 left-2 max-w-[60%] rounded-lg border border-hairline bg-void/85 px-2.5 py-1.5 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[9px] font-mono text-beam">
            <span>★ 4.9</span>
            <span className="text-mist/40">·</span>
            <span className="text-mist/70">Café · 0.3 mi</span>
          </div>
          <p className="mt-0.5 text-[10px] font-medium text-frost">
            Olo &amp; Stone
          </p>
          <div className="mt-1 flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-beam shadow-[0_0_4px_rgba(156,194,255,0.9)]" />
            <span className="font-mono text-[8px] text-mist/70">
              Open · table in 12 min
            </span>
          </div>
        </div>

        {/* Live tag, top-right */}
        <div className="absolute right-1 top-1 flex items-center gap-1 rounded-full border border-pulse/30 bg-pulse/10 px-1.5 py-[1px] font-mono text-[8px] text-pulse">
          <span className="h-1 w-1 rounded-full bg-pulse shadow-[0_0_4px_rgba(142,123,255,0.9)]" />
          LIVE
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-2 flex gap-1 overflow-hidden">
        {[
          { label: "Cafés", on: true },
          { label: "Eats", on: false },
          { label: "Shops", on: false },
          { label: "Fitness", on: false },
          { label: "Bars", on: false },
        ].map((c) => (
          <span
            key={c.label}
            className={`rounded-full border px-2 py-[2px] font-mono text-[8px] ${
              c.on
                ? "border-beam/50 bg-beam/10 text-beam"
                : "border-hairline text-mist/70"
            }`}
          >
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Mind Core — our own application tree.
 *
 * The reading: a vertical trunk descends from the studio mark and branches
 * into four slots. Three are still in the dark — dashed, hollow, waiting.
 * One is alive: MindBooks. A pulse halo orbits the live node, and a detail
 * card surfaces what it actually does — an AI booking system.
 */
function MindCorePreview() {
  const slots = [
    { x: 40, label: "—", live: false },
    { x: 95, label: "MindBooks", live: true },
    { x: 150, label: "—", live: false },
    { x: 200, label: "—", live: false },
  ];

  return (
    <div className="absolute inset-0 flex flex-col px-4 pb-3 pt-9">
      {/* HUD top */}
      <div className="flex items-center justify-between text-[9px] font-mono text-mist/60">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-beam shadow-[0_0_6px_rgba(156,194,255,0.9)]" />
          Product tree · v1.0
        </span>
        <span className="text-beam">1 / 4 live</span>
      </div>

      {/* The tree */}
      <div className="relative mt-2 flex-1 overflow-hidden">
        <svg
          viewBox="0 0 240 200"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <radialGradient id="mc-root-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(156,194,255,0.35)" />
              <stop offset="100%" stopColor="rgba(156,194,255,0)" />
            </radialGradient>
            <radialGradient id="mc-leaf-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(94,139,255,0.55)" />
              <stop offset="100%" stopColor="rgba(94,139,255,0)" />
            </radialGradient>
          </defs>

          {/* Root halo */}
          <ellipse cx="120" cy="24" rx="68" ry="22" fill="url(#mc-root-glow)" />

          {/* Root label — "MIND CORE" engraved capsule */}
          <g transform="translate(120, 24)">
            <rect
              x="-48"
              y="-11"
              width="96"
              height="22"
              rx="11"
              fill="rgba(11,13,20,0.92)"
              stroke="#9CC2FF"
              strokeWidth="0.8"
            />
            <text
              x="0"
              y="3.5"
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="monospace"
              fontWeight="700"
              letterSpacing="3"
              fill="#E8ECF6"
            >
              MIND CORE
            </text>
          </g>

          {/* Trunk down to the junction */}
          <line
            x1="120"
            y1="35"
            x2="120"
            y2="74"
            stroke="#9CC2FF"
            strokeWidth="0.9"
          />
          {/* Trunk glow */}
          <line
            x1="120"
            y1="35"
            x2="120"
            y2="74"
            stroke="rgba(156,194,255,0.35)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Junction dot */}
          <circle cx="120" cy="74" r="2.2" fill="#9CC2FF" />
          <circle cx="120" cy="74" r="5" fill="rgba(156,194,255,0.2)" />

          {/* Organic curved branches from junction to each leaf */}
          {slots.map((s, i) => (
            <path
              key={`branch-${i}`}
              d={`M120,74 C120,100 ${s.x},100 ${s.x},124`}
              stroke={s.live ? "#9CC2FF" : "rgba(156,194,255,0.28)"}
              strokeWidth={s.live ? "1" : "0.7"}
              strokeDasharray={s.live ? undefined : "2 2.5"}
              fill="none"
            />
          ))}

          {/* Leaf nodes */}
          {slots.map((s, i) =>
            s.live ? (
              <g key={`leaf-${i}`}>
                {/* outer aura */}
                <circle cx={s.x} cy="132" r="22" fill="url(#mc-leaf-glow)" />
                {/* pulsing ring */}
                <circle
                  cx={s.x}
                  cy="132"
                  r="11"
                  fill="none"
                  stroke="#9CC2FF"
                  strokeWidth="0.8"
                >
                  <animate
                    attributeName="r"
                    values="11;24"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.7;0"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* node body */}
                <circle
                  cx={s.x}
                  cy="132"
                  r="10"
                  fill="rgba(11,13,20,0.95)"
                  stroke="#9CC2FF"
                  strokeWidth="1"
                />
                <circle cx={s.x} cy="132" r="3.5" fill="#9CC2FF" />
                <text
                  x={s.x}
                  y="156"
                  textAnchor="middle"
                  fontSize="7.5"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill="#9CC2FF"
                >
                  MindBooks
                </text>
                <text
                  x={s.x}
                  y="166"
                  textAnchor="middle"
                  fontSize="5.5"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                  fill="rgba(154,163,181,0.65)"
                >
                  LIVE
                </text>
              </g>
            ) : (
              <g key={`leaf-${i}`}>
                <circle
                  cx={s.x}
                  cy="132"
                  r="8"
                  fill="rgba(11,13,20,0.9)"
                  stroke="rgba(156,194,255,0.32)"
                  strokeWidth="0.7"
                  strokeDasharray="1.5 2"
                />
                <text
                  x={s.x}
                  y="135"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill="rgba(154,163,181,0.45)"
                >
                  —
                </text>
                <text
                  x={s.x}
                  y="156"
                  textAnchor="middle"
                  fontSize="5.5"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                  fill="rgba(154,163,181,0.4)"
                >
                  SOON
                </text>
              </g>
            )
          )}
        </svg>

        {/* MindBooks detail card — floats at the base of the tree */}
        <div className="absolute inset-x-2 bottom-1 rounded-lg border border-beam/40 bg-void/85 px-3 py-2 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-beam opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-beam" />
              </span>
              <span className="text-[11px] font-semibold text-frost">
                MindBooks
              </span>
              <span className="rounded-full bg-pulse/15 px-1.5 py-[1px] font-mono text-[8px] tracking-label text-pulse">
                AI
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-label text-beam">
              LIVE
            </span>
          </div>
          <p className="mt-1 text-[10px] leading-snug text-mist">
            An intelligent booking system. Routes appointments to the right
            staff, predicts no-shows, and writes the confirmation —
            reservations handled end-to-end by AI.
          </p>
        </div>

        {/* Tag corner */}
        <div className="absolute right-1 top-1 flex items-center gap-1 rounded-full border border-hairline bg-void/60 px-1.5 py-[1px] font-mono text-[8px] text-mist/70">
          <span>tree.json</span>
        </div>
      </div>
    </div>
  );
}

function DefaultPreview() {
  return <div className="absolute inset-0" />;
}
