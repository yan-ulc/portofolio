"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

const capabilities = [
  {
    number: "01",
    title: "Front End",
    summary: "Interfaces that make complex products feel immediate and clear.",
    description:
      "I build responsive, accessible interfaces with thoughtful motion, strong visual hierarchy, and reusable component systems that hold up from the first viewport to the last interaction.",
    tools: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    accent: "#69a9ff",
    surface: "#bfdbfe",
    darkSurface: "#0f172a",
  },
  {
    number: "02",
    title: "Back End",
    summary: "Reliable foundations for products that need to move quickly.",
    description:
      "I design modular APIs, data flows, and service boundaries that keep applications dependable as features, traffic, and teams grow around them.",
    tools: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    accent: "#6fd3a5",
    surface: "#bbf7d0",
    darkSurface: "#0b1f17",
  },
  {
    number: "03",
    title: "Design",
    summary: "Systems thinking translated into calm, intentional experiences.",
    description:
      "I connect product intent with interaction details, turning complex requirements into interfaces that are easy to understand, use, and evolve.",
    tools: ["UX Thinking", "Prototyping", "Motion", "Design Systems"],
    accent: "#f19ab1",
    surface: "#fecdd3",
    darkSurface: "#1e131d",
  },
];

function CapabilityCard({
  capability,
  dragAreaRef,
  isActive,
  onActivate,
  positionClassName,
  initialRotation,
}: {
  capability: (typeof capabilities)[number];
  dragAreaRef: RefObject<HTMLDivElement | null>;
  isActive: boolean;
  onActivate: () => void;
  positionClassName: string;
  initialRotation: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState(initialRotation);
  const isDragging = useRef(false);

  const toggleFlip = () => setIsFlipped((current) => !current);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFlip();
    }
  };

  const handleClick = () => {
    if (isDragging.current) return;
    toggleFlip();
  };

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onActivate();
    setRotation((current) => current + 45);
  };

  return (
    <motion.div
      drag
      dragConstraints={dragAreaRef}
      dragElastic={0.08}
      dragMomentum={false}
      onPointerDown={onActivate}
      onDragStart={() => {
        isDragging.current = true;
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          isDragging.current = false;
        }, 0);
      }}
      whileDrag={{ scale: 1.02, cursor: "grabbing" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      animate={{ rotate: rotation }}
      className={`group absolute h-88 w-[min(78vw,21rem)] cursor-grab perspective-distant sm:h-96 sm:w-[20rem] ${positionClassName}`}
      style={{ zIndex: isActive ? 30 : 10 }}
      role="button"
      tabIndex={0}
      aria-label={`${capability.title} card. Press Enter to flip. Right click to rotate.`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full"
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full transform-3d"
        >
          <div
            className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_28px_65px_-20px_rgba(15,23,42,0.42),0_12px_26px_-10px_rgba(15,23,42,0.28)] backface-hidden sm:p-8 bg-[var(--card-surface-light)] dark:bg-[var(--card-surface-dark)]"
            style={{
              ["--card-surface-light" as string]: capability.surface,
              ["--card-surface-dark" as string]: capability.darkSurface,
              borderColor: `${capability.accent}88`,
            }}
          >
            <span className="absolute left-5 top-5 h-7 w-7 rounded-full border border-white/80 bg-white shadow-inner shadow-slate-900/10 dark:border-white/20 dark:bg-slate-800" />
            <div>
              <div className="mb-12 flex items-center justify-end">
                <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                  {capability.number}
                </span>
              </div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-slate-700 dark:text-slate-400">
                Capability
              </p>
              <h3 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {capability.title}
              </h3>
            </div>
            <div>
              <p className="max-w-[16rem] text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-300">
                {capability.summary}
              </p>
              <span className="mt-6 inline-flex font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-600 transition-colors group-hover:text-slate-950 dark:text-slate-400 dark:group-hover:text-white">
                Tap to turn
              </span>
            </div>
          </div>

          <div
            className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border p-6 shadow-[0_28px_65px_-20px_rgba(15,23,42,0.42),0_12px_26px_-10px_rgba(15,23,42,0.28)] backface-hidden transform-[rotateY(180deg)] sm:p-8 bg-[var(--card-surface-light)] dark:bg-[var(--card-surface-dark)]"
            style={{
              ["--card-surface-light" as string]: capability.surface,
              ["--card-surface-dark" as string]: capability.darkSurface,
              borderColor: `${capability.accent}66`,
            }}
          >
            <span className="absolute left-5 top-5 h-7 w-7 rounded-full border border-white/80 bg-white shadow-inner shadow-slate-900/10 dark:border-white/20 dark:bg-slate-800" />
            <div>
              <span
                className="block text-right font-mono text-xs font-bold"
                style={{ color: capability.accent }}
              >
                {capability.number} / DETAILS
              </span>
              <p className="mt-8 text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                {capability.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {capability.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-slate-900/15 bg-white/60 px-3 py-1.5 font-mono text-[0.68rem] font-semibold text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(capabilities[0].title);

  return (
    <div className="container mx-auto max-w-5xl pt-6 sm:pt-14">
      <div className="mb-6 max-w-xl sm:mb-8">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:mb-4">
          How I build
        </p>
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          From idea to interface.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 md:text-lg">
          Explore the three layers I bring together when turning a complex
          problem into a working product.
        </p>
      </div>

      <div
        ref={dragAreaRef}
        className="relative h-108 w-full sm:h-116"
        aria-label="Interactive capability cards"
      >
        {capabilities.map((capability, index) => (
          <CapabilityCard
            key={capability.title}
            capability={capability}
            dragAreaRef={dragAreaRef}
            isActive={activeCard === capability.title}
            onActivate={() => setActiveCard(capability.title)}
            positionClassName={
              [
                "left-[2%] top-[2%] sm:left-[8%] sm:top-[3%]",
                "left-[10%] top-[10%] sm:left-[31%] sm:top-[9%]",
                "left-[18%] top-[18%] sm:left-[54%] sm:top-[15%]",
              ][index]
            }
            initialRotation={[-4, 3, -3][index]}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground/60">
        Scroll to move through the section / drag, tap, or right-click a card
      </p>
    </div>
  );
}

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function AboutCapabilitiesTransition({
  about,
  capabilities: capabilitiesContent,
}: {
  about: ReactNode;
  capabilities: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
    restDelta: 0.0001,
  });

  const trackX = useTransform(
    smoothProgress,
    [0.12, 0.72],
    ["0vw", "-100vw"],
    { ease: easeInOutSine },
  );

  const aboutOpacity = useTransform(
    smoothProgress,
    [0, 0.12, 0.58, 0.72],
    [1, 1, 0.35, 0],
  );
  const aboutScale = useTransform(smoothProgress, [0.12, 0.72], [1, 0.94], {
    ease: easeInOutSine,
  });

  const capabilitiesOpacity = useTransform(
    smoothProgress,
    [0.12, 0.26, 0.72, 1],
    [0, 0.65, 1, 1],
  );
  const capabilitiesScale = useTransform(
    smoothProgress,
    [0.12, 0.72],
    [0.94, 1],
    { ease: easeInOutSine },
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[280vh] w-full border-y border-border/50 bg-muted/30"
    >
      <div className="sticky top-0 z-10 h-dvh w-full overflow-hidden">
        <motion.div
          style={{ x: trackX }}
          className="flex h-full w-[200vw] will-change-transform"
        >
          <motion.div
            style={{ opacity: aboutOpacity, scale: aboutScale }}
            className="flex h-full w-screen shrink-0 items-center justify-center px-4"
          >
            {about}
          </motion.div>
          <motion.div
            style={{ opacity: capabilitiesOpacity, scale: capabilitiesScale }}
            className="flex h-full w-screen shrink-0 items-center justify-center px-4"
          >
            {capabilitiesContent}
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col">
        <section id="about" aria-label="About" className="w-full flex-1" />
        <section
          id="capabilities"
          aria-label="Capabilities"
          className="w-full flex-1"
        />
      </div>
    </div>
  );
}
