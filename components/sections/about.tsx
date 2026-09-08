"use client";

import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full border-y border-border/50 bg-muted/30 px-4 py-28"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex items-center gap-4 text-3xl font-bold tracking-tight"
        >
          <span className="h-0.5 w-8 bg-primary" />
          About
        </motion.h2>

        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex flex-col gap-7 border-l-2 border-primary/30 pl-6 text-lg leading-relaxed text-muted-foreground md:pl-8"
          >
            <p className="max-w-2xl text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
              I build thoughtful software at the intersection of intelligent
              systems and human-centered interfaces.
            </p>
            <p>
              I’m a fresh graduate in Computer Engineering from Universitas
              Syiah Kuala with a strong interest in software engineering,
              machine learning, and AI.
            </p>
            <p>
              Over the past 2+ years, I’ve built independent projects ranging
              from full-stack web applications and AI-powered products to
              machine learning and NLP systems.
            </p>
            <p>
              I like building things end-to-end — from designing interfaces and
              backend APIs to training models and integrating LLM-based systems
              into real applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="h-fit overflow-hidden rounded-xl border border-border bg-background shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-6 py-5">
              <h3 className="font-mono text-sm font-semibold tracking-wider text-primary">
                QUICK_FACTS
              </h3>
              <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Available
              </span>
            </div>
            <ul className="grid grid-cols-2 divide-x divide-y divide-border/60">
              <li className="min-h-28 p-5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Experience
                </span>
                <span className="mt-3 block text-lg font-bold text-foreground">
                  2+ Years
                </span>
              </li>
              <li className="min-h-28 p-5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Focus
                </span>
                <span className="mt-3 block text-lg font-bold text-foreground">
                  Full-Stack / AI
                </span>
              </li>
              <li className="min-h-28 p-5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Education
                </span>
                <span className="mt-3 block text-sm font-bold leading-snug text-foreground">
                  Computer Engineering
                </span>
              </li>
              <li className="min-h-28 p-5">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </span>
                <span className="mt-3 block text-sm font-bold leading-snug text-foreground">
                  Fresh Graduate
                </span>
              </li>
            </ul>
            <div className="border-t border-border/60 bg-muted/20 px-6 py-5">
              <span className="block font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                Currently building
              </span>
              <span className="mt-2 block text-sm font-semibold text-foreground">
                Interfaces, APIs, and intelligent products.
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
