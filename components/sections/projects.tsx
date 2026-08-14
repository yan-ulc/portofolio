"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/icons";
import { projects } from "@/data/projects";
import { ProjectPreview } from "@/components/project-preview";
import { motion } from "motion/react";

export function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-24 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight mb-16 flex items-center gap-4"
        >
          <span className="w-8 h-[2px] bg-primary"></span>
          Projects & Explorations
        </motion.h2>
        
        <div className="flex flex-col gap-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            const hasPreview = !!project.liveUrl;

            return (
              <motion.div 
                key={project.slug} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}
              >
                
                {/* Visual / Preview Side */}
                <div className="w-full lg:w-3/5">
                  {hasPreview ? (
                    <ProjectPreview title={project.title} url={project.liveUrl} fallback={project.hasIframe === false} />
                  ) : (
                    <Card className="w-full aspect-video md:aspect-[16/10] flex flex-col justify-center items-center bg-muted/20 border-dashed overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background pointer-events-none" />
                      {project.metrics ? (
                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 z-10">
                          {Object.entries(project.metrics).map(([k, v]) => (
                            <div key={k} className="text-center bg-background/80 p-6 rounded-xl border shadow-sm backdrop-blur-sm">
                              <div className="text-3xl md:text-5xl font-extrabold text-primary mb-3">{v}</div>
                              <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{k}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground font-mono text-sm z-10 bg-background/80 px-6 py-3 rounded-lg border">
                          System Architecture & Pipeline
                        </div>
                      )}
                    </Card>
                  )}
                </div>

                {/* Info Side */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="text-primary font-mono text-sm tracking-wider uppercase font-semibold">{project.category}</span>
                    <h3 className="text-3xl md:text-4xl font-bold mt-2 leading-tight">{project.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" className="px-3 py-1 font-medium">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={buttonVariants({ variant: "default", size: "lg", className: "gap-2 shadow-sm hover:shadow-md transition-all" })}
                      >
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={buttonVariants({ variant: "outline", size: "lg", className: "gap-2" })}
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
