"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  House,
  Layers3,
  Mail,
  UserRound,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";

const navItems = [
  { name: "Home", href: "#home", icon: House },
  { name: "About", href: "#about", icon: UserRound },
  { name: "Capabilities", href: "#capabilities", icon: Layers3 },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Experience", href: "#experience", icon: BriefcaseBusiness },
  { name: "Contact", href: "#contact", icon: Mail },
];

const getSectionTop = (element: HTMLElement) =>
  element.getBoundingClientRect().top + window.scrollY;

const getTargetPosition = (targetId: string, target: HTMLElement) => {
  if (targetId === "home") return 0;
  const top = getSectionTop(target);
  return Math.max(
    0,
    targetId === "about" || targetId === "capabilities" ? top : top - 32,
  );
};

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const navigationTarget = useRef<string | null>(null);
  const navigationTimeout = useRef<number | null>(null);

  useEffect(() => {
    const clearNavigationLock = () => {
      navigationTarget.current = null;
      if (navigationTimeout.current !== null) {
        window.clearTimeout(navigationTimeout.current);
        navigationTimeout.current = null;
      }
    };

    const handleScroll = () => {
      if (navigationTarget.current) {
        const target = document.getElementById(navigationTarget.current);
        const targetPosition = target
          ? getTargetPosition(navigationTarget.current, target)
          : 0;

        setActiveSection(navigationTarget.current);

        if (Math.abs(window.scrollY - targetPosition) < 40) {
          clearNavigationLock();
        } else {
          return;
        }
      }

      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let matchedSection = "home";

      sections.forEach((section) => {
        const sectionEl = section as HTMLElement;
        const sectionTop = getSectionTop(sectionEl);
        const sectionHeight = sectionEl.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight &&
          sectionId
        ) {
          matchedSection = sectionId;
        }
      });

      setActiveSection(matchedSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", clearNavigationLock, { passive: true });
    window.addEventListener("touchmove", clearNavigationLock, {
      passive: true,
    });
    window.addEventListener("keydown", clearNavigationLock);

    return () => {
      clearNavigationLock();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", clearNavigationLock);
      window.removeEventListener("touchmove", clearNavigationLock);
      window.removeEventListener("keydown", clearNavigationLock);
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.replace("#", "");
    const target = document.getElementById(targetId);

    if (target) {
      navigationTarget.current = targetId;
      if (navigationTimeout.current !== null) {
        window.clearTimeout(navigationTimeout.current);
      }
      navigationTimeout.current = window.setTimeout(() => {
        navigationTarget.current = null;
        navigationTimeout.current = null;
      }, 900);

      setActiveSection(targetId);
      window.scrollTo({
        top: getTargetPosition(targetId, target),
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
                "relative isolate flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground sm:px-4",
                isActive && "bg-foreground/5 text-foreground",
              )}
            >
              <span className="relative z-10 hidden md:inline">
                {item.name}
              </span>
              <span className="relative z-10 md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="active-nav-lamp"
                  className="absolute -top-2 left-1/2 z-20 h-1 w-8 -translate-x-1/2 rounded-t-full bg-foreground"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-foreground/20 blur-md" />
                  <div className="absolute -top-1 h-6 w-8 rounded-full bg-foreground/20 blur-md" />
                  <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-foreground/20 blur-sm" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>
      <ThemeToggle />
    </div>
  );
}
