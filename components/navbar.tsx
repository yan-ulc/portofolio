"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";

const navItems = [
  { name: "Home", href: "#home", icon: House },
  { name: "About", href: "#about", icon: UserRound },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Experience", href: "#experience", icon: BriefcaseBusiness },
  { name: "Contact", href: "#contact", icon: Mail },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId ?? "home");
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      setActiveSection(targetId);
      window.scrollTo({
        top: target.offsetTop - 32,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 z-50 mb-4 flex -translate-x-1/2 items-center gap-2 sm:top-0 sm:bottom-auto sm:mb-0 sm:pt-5">
      <nav className="flex items-center gap-1 rounded-full border border-border bg-background/75 p-1 shadow-lg backdrop-blur-lg sm:gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.href.replace("#", "");

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(event) => handleClick(event, item.href)}
              aria-label={item.name}
              className={cn(
                "relative flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary sm:px-4",
                isActive && "text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.span
                  layoutId="active-nav-item"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
      <ThemeToggle />
    </div>
  );
}
