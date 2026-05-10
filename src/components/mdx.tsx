import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-[32px] font-semibold tracking-[-0.02em] mt-12 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[24px] font-semibold tracking-[-0.01em] mt-10 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[18px] font-semibold mt-8 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] text-muted-foreground leading-[1.7] mb-5">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline decoration-border hover:decoration-foreground transition-colors"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href || "#"} className="text-foreground underline decoration-border hover:decoration-foreground transition-colors">
        {children}
      </Link>
    );
  },
  ul: ({ children }) => (
    <ul className="text-[15px] text-muted-foreground leading-[1.7] mb-5 pl-5 list-disc space-y-1.5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-[15px] text-muted-foreground leading-[1.7] mb-5 pl-5 list-decimal space-y-1.5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-4 my-5 text-muted-foreground italic">
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => {
    // Inline code (not inside a pre/code block from rehype-pretty-code)
    const isBlock = typeof children === "object";
    if (isBlock) return <code {...props}>{children}</code>;
    return (
      <code className="text-[14px] font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="text-[14px] font-mono rounded-md border border-border overflow-x-auto mb-5 p-4"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: () => <hr className="border-border my-10" />,
  strong: ({ children }) => (
    <strong className="text-foreground font-medium">{children}</strong>
  ),
};
