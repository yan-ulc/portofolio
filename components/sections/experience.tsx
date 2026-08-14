"use client";

import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

export function ExperienceSection() {
  return (
    <section id="experience" className="w-full py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight mb-16 flex items-center gap-4"
        >
          <span className="w-8 h-[2px] bg-primary"></span>
          Experience
        </motion.h2>
        
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 border bg-card/50 shadow-sm relative overflow-hidden group mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">AI / Software Development Intern</h3>
                <span className="font-mono text-sm text-muted-foreground mt-1 md:mt-0">Internship</span>
              </div>
              <h4 className="text-lg text-primary font-medium mb-6">Diskominfotik Banda Aceh</h4>
              <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-3 text-lg leading-relaxed">
                <li>Developed an AI chatbot for the Sinergi website to provide an interactive conversational interface for users.</li>
                <li>Integrated AI and software solutions for real-world web deployment.</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-8 border bg-card/50 shadow-sm relative overflow-hidden group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-foreground/80">Independent Software & ML Developer</h3>
                <span className="font-mono text-sm text-muted-foreground mt-1 md:mt-0">2+ Years</span>
              </div>
              <h4 className="text-lg text-muted-foreground font-medium mb-6">Self-Directed Projects</h4>
              <ul className="list-disc list-outside ml-4 text-muted-foreground space-y-3 text-lg leading-relaxed">
                <li>Built multiple independent projects spanning Machine Learning, Full-Stack Web Development, and AI Products.</li>
                <li>Engineered a comparative NLP classification system achieving 92.50% accuracy on Indonesian social media data.</li>
                <li>Architected and implemented end-to-end MLOps pipelines using Kafka, Docker, MLflow, and PostgreSQL.</li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
