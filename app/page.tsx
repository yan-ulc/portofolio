"use client";

import { AppleHelloEnglishEffect } from "@/components/apple-hello-effect";
import GifText from "@/components/gif-text";
import { Github } from "@/components/icons";
import { AboutSection } from "@/components/sections/about";
import { CapabilitiesSection } from "@/components/sections/capabilities";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { buttonVariants } from "@/components/ui/button";
import TextBlockAnimation from "@/components/ui/text-block-animation";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background"
            aria-label="Welcome"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -18 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <AppleHelloEnglishEffect
                speed={0.85}
                className="h-auto w-[min(88vw,638px)] text-foreground"
                onAnimationComplete={() => setShowIntro(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex w-full flex-col items-center">
        {/* HERO SECTION */}
        <section
          id="home"
          className="w-full flex items-center justify-center min-h-[90vh] py-20 px-4"
        >
          <div className="container mx-auto max-w-5xl flex flex-col items-start gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <GifText
                text="Hi, I'm Ryan."
                containerClassName="items-start justify-start bg-transparent p-0"
                className="text-left text-4xl leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
              />
            </motion.div>

            <div className="mt-2 flex flex-col gap-2">
              <TextBlockAnimation
                blockColor="#111318"
                animateOnScroll={false}
                delay={0.1}
                duration={0.8}
              >
                <h2 className="text-2xl font-bold text-foreground/90 md:text-3xl">
                  Full-Stack Engineer &middot; Machine Learning Engineer
                </h2>
              </TextBlockAnimation>
              <TextBlockAnimation
                blockColor="#555b66"
                animateOnScroll={false}
                delay={0.2}
                duration={0.7}
              >
                <p className="font-mono text-sm font-medium text-primary md:text-base">
                  Next.js / TypeScript &middot; Python &middot; Machine Learning
                  &middot; LLMs &middot; AI Agents &middot; Backend
                </p>
              </TextBlockAnimation>
            </div>

            <TextBlockAnimation
              blockColor="#111318"
              animateOnScroll={false}
              delay={0.3}
              duration={0.8}
              className="max-w-[700px]"
            >
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                Fresh graduate in Computer Engineering with 2+ years of hands-on
                experience building web applications, AI systems, machine
                learning projects, and software solutions.
              </p>
            </TextBlockAnimation>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            >
              <Link
                href="#projects"
                className={buttonVariants({
                  size: "lg",
                  className: "gap-2 h-12 px-8",
                })}
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://github.com/yan-ulc"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className:
                    "gap-2 h-12 px-8 border-foreground/20 hover:bg-foreground/5",
                })}
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <Link
                href="#contact"
                className={buttonVariants({
                  size: "lg",
                  variant: "ghost",
                  className: "gap-2 h-12 px-8",
                })}
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        </section>

        <AboutSection />
        <CapabilitiesSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />

        {/* Footer */}
        <footer className="w-full py-8 px-4 text-center text-muted-foreground text-sm border-t border-border/50 bg-background">
          <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p>
              &copy; {new Date().getFullYear()} Muhammad Ryan. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs opacity-50">
                Built with Next.js & Tailwind CSS
              </span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
