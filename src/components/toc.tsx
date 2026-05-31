"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/content";

export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      // Trigger when a heading is in the top third of the viewport.
      { rootMargin: "-80px 0px -66% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active item visible within the (scrollable) TOC container as the
  // reader scrolls. Scrolls only the TOC's own scroll box, never the page.
  useEffect(() => {
    const nav = navRef.current;
    if (!activeId || !nav) return;

    const link = nav.querySelector<HTMLElement>(
      `a[href="#${CSS.escape(activeId)}"]`
    );
    if (!link) return;

    // Nearest scrollable ancestor of the TOC.
    let scroller: HTMLElement | null = nav.parentElement;
    while (
      scroller &&
      scroller.scrollHeight <= scroller.clientHeight
    ) {
      scroller = scroller.parentElement;
    }
    if (!scroller) return;

    const margin = 24;
    const sRect = scroller.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();
    if (lRect.top < sRect.top + margin) {
      scroller.scrollBy({ top: lRect.top - sRect.top - margin, behavior: "smooth" });
    } else if (lRect.bottom > sRect.bottom - margin) {
      scroller.scrollBy({
        top: lRect.bottom - sRect.bottom + margin,
        behavior: "smooth",
      });
    }
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav ref={navRef} aria-label="Table of contents" className="text-[13px]">
      <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/60 mb-3">
        On this page
      </p>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.depth === 3 ? 16 : 0 }}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block -ml-px border-l border-transparent pl-3 leading-snug transition-colors",
                activeId === item.id
                  ? "border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Collapsible variant shown on small screens where there is no gutter.
export function TocMobile({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <details className="xl:hidden mb-10 rounded-lg border border-border px-4 py-3">
      <summary className="cursor-pointer text-[14px] font-medium select-none">
        On this page
      </summary>
      <ul className="mt-3 space-y-2 text-[14px]">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.depth === 3 ? 16 : 0 }}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
