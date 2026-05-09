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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);

  const linkClass =
    "inline-flex min-h-11 items-center gap-2 pl-2 pr-3.5 py-2 text-[11px] font-mono uppercase tracking-[0.1em] text-foreground transition-colors hover:text-[var(--accent-warm)]";
  const keyClass =
    "inline-flex h-[22px] w-[22px] items-center justify-center rounded-[4px] border border-foreground text-[11px] font-semibold leading-none transition-colors";

  return (
    <header className="mx-auto max-w-[1100px] px-6 pt-7 sm:px-10">
      <nav className="flex items-center border-y border-foreground py-1.5">
        {/* Desktop letterbar */}
        <ul className="hidden items-center sm:flex">
          {links.map((link) => (
            <li key={link.key} className="border-r border-border last:border-r-0">
              <Link href={link.href} className={linkClass}>
                <span className={keyClass}>{link.key}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile brand */}
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground sm:hidden"
        >
          dev.dalia
        </Link>

        {/* Right cluster: Contact + theme toggle (desktop), hamburger + toggle (mobile) */}
        <div className="ml-auto flex items-center gap-3">
          <a
            href="mailto:devdalia9@gmail.com"
            className={`${linkClass} hidden sm:inline-flex`}
          >
            <span className={keyClass}>C</span>
            Contact
          </a>
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-foreground/30 font-mono text-[11px] uppercase tracking-[0.12em] sm:hidden"
          >
            Menu
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {menuOpen && (
        <div className="border-b border-border bg-background sm:hidden">
          <ul className="flex flex-col">
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
