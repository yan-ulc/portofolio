"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const skillCategories = [
  {
    name: "Full-Stack Development",
    skills: [
      { name: "Next.js", level: "Core" },
      { name: "React", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "Tailwind CSS", level: "Core" },
      { name: "Node.js", level: "Core" },
      { name: "REST API", level: "Core" }
    ]
  },
  {
    name: "Machine Learning / AI",
    skills: [
      { name: "Python", level: "Core" },
      { name: "PyTorch", level: "Core" },
      { name: "Scikit-learn", level: "Core" },
      { name: "Hugging Face", level: "Core" },
      { name: "Transformers", level: "Core" },
      { name: "NLP", level: "Core" },
      { name: "Computer Vision", level: "Familiar" }
    ]
  },
  {
    name: "Generative AI",
    skills: [
      { name: "LLMs", level: "Core" },
      { name: "RAG", level: "Core" },
      { name: "AI Agents", level: "Core" },
      { name: "Prompt Engineering", level: "Core" },
      { name: "Embeddings", level: "Familiar" },
      { name: "LLM APIs", level: "Core" }
    ]
  },
  {
    name: "Backend / Data",
    skills: [
      { name: "FastAPI", level: "Core" },
      { name: "PostgreSQL", level: "Core" },
      { name: "Firebase", level: "Familiar" },
    ]
  },
  {
    name: "MLOps / Infrastructure",
    skills: [
      { name: "Docker", level: "Core" },
      { name: "Docker Compose", level: "Core" },
      { name: "MLflow", level: "Core" },
      { name: "Kafka", level: "Familiar" },
      { name: "MinIO", level: "Familiar" },
      { name: "Prefect", level: "Exploring" }
    ]
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="w-full py-24 px-4 bg-muted/10 border-y border-border/50">
      <div className="container mx-auto max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight mb-16 flex items-center gap-4"
        >
          <span className="w-8 h-[2px] bg-primary"></span>
          Technical Toolkit
        </motion.h2>

        <div className="flex flex-col gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={category.name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col md:flex-row gap-4 md:gap-12"
            >
              <h3 className="text-xl font-semibold border-b border-border/50 pb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill.name} 
                    variant={skill.level === "Core" ? "default" : skill.level === "Familiar" ? "secondary" : "outline"}
                    className="px-3 py-1.5 text-sm font-medium transition-all hover:scale-105"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 flex flex-wrap gap-8 text-sm text-muted-foreground border-t border-border/50 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/20"></div>
            <span className="font-medium">Core Focus</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-secondary ring-2 ring-secondary/20"></div>
            <span className="font-medium">Familiar</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full border border-border"></div>
            <span className="font-medium">Exploring</span>
          </div>
        </div>
      </div>
    </section>
  )
}
