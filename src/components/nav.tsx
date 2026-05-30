"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const links = [
  { key: "W", label: "Writing", href: "/writing" },
  { key: "P", label: "Projects", href: "/work" },
  { key: "O", label: "OSS", href: "/oss" },
  { key: "A", label: "About", href: "/about" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const pathname = usePathname() ?? "/";
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
  const activeLabelClass = "underline underline-offset-[3px] decoration-foreground";

  return (
    <header className="mx-auto max-w-[1100px] px-6 pt-7 sm:px-10">
      <nav className="flex items-center border-y border-foreground py-1.5">
        {/* Brand / home link (visible on all viewports) — DD monogram chip.
            Fills only when home is the current page, so "filled = current page"
            stays the single, unambiguous active-state signal across the nav. */}
        <Link
          href="/"
          aria-label="Dev Dalia — home"
          aria-current={isActive(pathname, "/") ? "page" : undefined}
          className="inline-flex min-h-11 items-center px-2 py-2"
        >
          <span className="inline-flex h-[22px] items-center justify-center rounded-[4px] bg-foreground px-1.5 font-mono text-[11px] font-bold leading-none tracking-[0.06em] text-background">
            DD
          </span>
        </Link>

        {/* Desktop letterbar */}
        <ul className="ml-4 hidden items-center sm:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.key} className="border-r border-border last:border-r-0">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={linkClass}
                >
                  <span className={keyClass}>{link.key}</span>
                  <span className={active ? activeLabelClass : undefined}>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster: hamburger (mobile) + theme toggle */}
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-md border border-foreground/30 font-mono text-[11px] uppercase tracking-[0.12em] sm:hidden"
          >
            Menu
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {menuOpen && (
        <div className="border-b border-border bg-background sm:hidden">
          <ul className="flex flex-col">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={`mobile-${link.key}`}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`${linkClass} border-b border-border/70`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={keyClass}>{link.key}</span>
                    <span className={active ? activeLabelClass : undefined}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
