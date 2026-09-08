"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const features = [
  {
    id: "intelligence",
    title: "Intelligence Systems",
    description:
      "Specializing in architecting autonomous systems and intelligence-driven platforms. From fine-tuning LLMs and engineering RAG architectures to developing deep learning models for Computer Vision and NLP.",
    tags: [
      "LLM Fine-tuning",
      "RAG Systems",
      "Deep Learning",
      "Computer Vision",
      "MLOps",
      "Data Analytics",
    ],
    accent: "text-sky-500 dark:text-sky-400",
    accentBackground: "bg-sky-500/10 dark:bg-sky-400/10",
  },
  {
    id: "scalable",
    title: "Scalable Systems",
    description:
      "Building the foundation for resilient digital ecosystems. I engineer full-stack solutions with a focus on system architecture, modular design, and high-performance backends using Next.js, Python, and modern DevOps tooling.",
    tags: [
      "System Architecture",
      "Full-Stack Dev",
      "Docker & CI/CD",
      "API Design",
      "DevOps",
      "Software Design",
    ],
    accent: "text-emerald-500 dark:text-emerald-400",
    accentBackground: "bg-emerald-500/10 dark:bg-emerald-400/10",
  },
  {
    id: "strategic",
    title: "Strategic Innovation",
    description:
      "Translating complex technical requirements into impactful business solutions through systemic thinking, strategic leadership, and clear communication within cross-functional teams.",
    tags: [
      "Systemic Thinking",
      "Leadership",
      "Problem Solving",
      "Teamwork",
      "Communication",
      "Research",
    ],
    accent: "text-rose-500 dark:text-rose-400",
    accentBackground: "bg-rose-500/10 dark:bg-rose-400/10",
  },
];

const contentVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const tagVariants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
};

export function FeaturesSection() {
  const [openFeature, setOpenFeature] = useState(features[0].id);

  return (
    <section
      id="features"
      className="w-full border-y border-border/50 bg-muted/10 px-4 py-24"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <h2 className="mb-4 flex items-center gap-4 text-3xl font-bold tracking-tight">
            <span className="h-0.5 w-8 bg-primary" />
            Feature Section
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            A closer look at the systems, practices, and thinking behind the
            work.
          </p>
        </motion.div>

        <div className="divide-y divide-border/60 border-y border-border/60">
          {features.map((feature, index) => {
            const isOpen = openFeature === feature.id;

            return (
              <div key={feature.id}>
                <motion.button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${feature.id}-content`}
                  onClick={() => setOpenFeature(isOpen ? "" : feature.id)}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs font-semibold ${feature.accent}`}
                    >
                      0{index + 1}
                    </span>
                    <motion.span
                      animate={{
                        color: isOpen
                          ? "var(--foreground)"
                          : "var(--muted-foreground)",
                        opacity: isOpen ? 1 : 0.78,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="text-xl font-semibold tracking-tight md:text-2xl"
                    >
                      {feature.title}
                    </motion.span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="text-2xl font-light text-muted-foreground"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </motion.button>

                <AnimatePresence mode="wait" initial={false}>
                  {isOpen && (
                    <motion.div
                      key={feature.id}
                      id={`${feature.id}-content`}
                      variants={contentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden pb-8 pl-10 pr-2 md:pl-14 md:pr-16"
                    >
                      <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {feature.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            variants={tagVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                              duration: 0.3,
                              delay: 0.08 + tagIndex * 0.045,
                              ease: "easeOut",
                            }}
                            className={`rounded-full border border-border px-3 py-1.5 font-mono text-xs font-medium text-foreground/80 ${feature.accentBackground}`}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
