"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const links = [
  { key: "W", label: "Writing", href: "/writing" },
  { key: "P", label: "Projects", href: "/work" },
  { key: "O", label: "OSS", href: "/oss" },
  { key: "A", label: "About", href: "/about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const linkClass =
    "inline-flex min-h-11 items-center gap-2 px-3 py-2 text-[11px] font-mono uppercase tracking-[0.1em] text-foreground transition-colors hover:text-[var(--accent-warm)]";
  const keyClass =
    "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border border-foreground text-[11px] font-semibold leading-none";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : ""
      }`}
    >
      <nav className="mx-auto flex h-[60px] max-w-5xl items-center px-6 sm:px-10">
        <Link
          href="/"
          className="min-h-11 font-mono inline-flex items-center text-[13px] font-normal tracking-tight text-foreground"
        >
          dev.dalia
        </Link>

        <ul className="ml-4 hidden items-center border-y border-foreground/15 sm:flex">
          {links.map((link) => (
            <li key={link.key} className="border-r border-foreground/15 last:border-r-0">
              <Link href={link.href} className={linkClass}>
                <span className={keyClass}>{link.key}</span>
                {link.label}
              </Link>
            </li>
          ))}
          <li className="ml-auto border-r border-foreground/15">
            <a href="mailto:devdalia9@gmail.com" className={linkClass}>
              <span className={keyClass}>C</span>
              Contact
            </a>
          </li>
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-foreground/25 font-mono text-[11px] uppercase tracking-[0.12em] sm:hidden"
          >
            Menu
          </button>
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background sm:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col px-6 py-2">
            {links.map((link) => (
              <li key={`mobile-${link.key}`}>
                <Link
                  href={link.href}
                  className={`${linkClass} border-b border-border/70`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={keyClass}>{link.key}</span>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="mailto:devdalia9@gmail.com"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                <span className={keyClass}>C</span>
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
