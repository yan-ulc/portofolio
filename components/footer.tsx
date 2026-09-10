"use client";

import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Capabilities", href: "#capabilities" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-border/60 bg-background/95 py-12 px-4 transition-colors">
      <div className="container mx-auto max-w-5xl flex flex-col gap-10">
        {/* Top row: Brand summary, quick navigation, and social links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Muhammad Ryan
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full-Stack Engineer &middot; Machine Learning Engineer. Building
              intelligent software, resilient backends, and human-centered
              interfaces.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">
                Available for engineering roles & collaborations
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/yan-ulc"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="h-9 w-9 rounded-full border border-border bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/yan-ulc"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="h-9 w-9 rounded-full border border-border bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:muhammad7135@gmail.com"
                aria-label="Email Ryan"
                className="h-9 w-9 rounded-full border border-border bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="gap-2 h-9 rounded-full border-border/80 text-xs font-mono hover:bg-muted cursor-pointer"
            >
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Middle row: Quick navigation anchors */}
        <div className="border-t border-border/40 pt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
            Navigation:
          </span>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Bottom row: Copyright & Tech attribution */}
        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Muhammad Ryan. All rights
            reserved.
          </p>
          <div className="flex items-center gap-1 font-mono">
            <span>Built with Next.js, Tailwind CSS &amp; Convex</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
