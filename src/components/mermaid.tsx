"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const { resolvedTheme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    import("mermaid")
      .then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          fontFamily: "inherit",
        });
        // mermaid requires a CSS-id-safe selector; strip colons from useId.
        const id = `mermaid-${reactId.replace(/:/g, "")}`;
        return mermaid.render(id, chart);
      })
      .then((result) => {
        if (active && ref.current && result) {
          ref.current.innerHTML = result.svg;
          setError(null);
        }
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : "Failed to render diagram");
      });

    return () => {
      active = false;
    };
  }, [chart, resolvedTheme, reactId]);

  if (error) {
    return (
      <pre className="text-[13px] font-mono rounded-md border border-destructive/40 bg-destructive/5 text-destructive overflow-x-auto my-6 p-4">
        Diagram error: {error}
        {"\n\n"}
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={ref}
      role="img"
      className="my-8 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
    />
  );
}
