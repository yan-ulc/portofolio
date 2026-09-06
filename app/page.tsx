"use client";

import GifText from "@/components/gif-text";
import { Github } from "@/components/icons";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl"
          >
            <GifText
              text="Hello"
              containerClassName="items-start justify-start bg-transparent p-0"
              className="text-left text-3xl leading-none tracking-tight md:text-5xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-2 mt-2"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground/90">
              Full-Stack Engineer &middot; Machine Learning Engineer
            </h2>
            <p className="text-sm md:text-base text-primary font-mono font-medium">
              Next.js / TypeScript &middot; Python &middot; Machine Learning
              &middot; LLMs &middot; AI Agents &middot; Backend
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Fresh graduate in Computer Engineering with 2+ years of hands-on
            experience building web applications, AI systems, machine learning
            projects, and software solutions.
          </motion.p>

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
  );
}
