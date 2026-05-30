import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Mermaid } from "@/components/mermaid";

export const mdxComponents: MDXComponents = {
  h1: ({ children, id }) => (
    <h1
      id={id}
      className="group scroll-mt-28 text-[32px] font-semibold tracking-[-0.02em] mt-12 mb-4 first:mt-0"
    >
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2
      id={id}
      className="group scroll-mt-28 text-[24px] font-semibold tracking-[-0.01em] mt-10 mb-3"
    >
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="group scroll-mt-28 text-[18px] font-semibold mt-8 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] text-muted-foreground leading-[1.7] mb-5">
      {children}
    </p>
  ),
  a: ({ href, children, className }) => {
    // Heading anchor links injected by rehype-autolink-headings.
    if (typeof className === "string" && className.includes("heading-anchor")) {
      return (
        <a
          href={href}
          aria-hidden="true"
          tabIndex={-1}
          className="heading-anchor ml-2 text-muted-foreground/40 no-underline opacity-0 group-hover:opacity-100 hover:text-foreground transition-opacity"
        >
          {children}
        </a>
      );
    }
    // In-page anchor jumps (e.g. manual section links).
    if (href?.startsWith("#")) {
      return (
        <a
          href={href}
          className="text-foreground underline decoration-border hover:decoration-foreground transition-colors"
        >
          {children}
        </a>
      );
    }
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
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : ""}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      className="rounded-lg border border-border my-6 w-full"
    />
  ),
  figure: ({ children }) => <figure className="my-6">{children}</figure>,
  figcaption: ({ children }) => (
    <figcaption className="text-[13px] text-muted-foreground text-center mt-2">
      {children}
    </figcaption>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-[14px] border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-border">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="text-left font-medium text-foreground py-2 pr-4 align-top">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-muted-foreground py-2 pr-4 align-top leading-[1.6]">
      {children}
    </td>
  ),
  // Custom element emitted by the rehypeMermaid transform for ```mermaid blocks.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mermaid: ({ chart }: any) => (
    <Mermaid chart={typeof chart === "string" ? chart : ""} />
  ),
};
