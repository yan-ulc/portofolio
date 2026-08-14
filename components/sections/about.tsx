"use client";

import { motion } from "motion/react";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight mb-12 flex items-center gap-4"
        >
          <span className="w-8 h-[2px] bg-primary"></span>
          About
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>
              I’m a fresh graduate in Computer Engineering from Universitas Syiah Kuala with a strong interest in software engineering, machine learning, and AI.
            </p>
            <p>
              Over the past 2+ years, I’ve built independent projects ranging from full-stack web applications and AI-powered products to machine learning and NLP systems.
            </p>
            <p>
              I like building things end-to-end — from designing interfaces and backend APIs to training models and integrating LLM-based systems into real applications.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background border border-border p-8 rounded-xl shadow-sm h-fit"
          >
            <h3 className="font-mono text-primary font-semibold mb-6 tracking-wider">QUICK_FACTS</h3>
            <ul className="flex flex-col gap-6">
              <li className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Experience</span>
                <span className="text-lg font-medium text-foreground">2+ Years Project Experience</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Focus</span>
                <span className="text-lg font-medium text-foreground">Full-Stack &middot; AI &middot; ML</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Education</span>
                <span className="text-lg font-medium text-foreground">Universitas Syiah Kuala / S1 Teknik Komputer</span>
              </li>
              <li className="flex flex-col">
                <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Status</span>
                <span className="text-lg font-medium text-foreground">Fresh Graduate</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
