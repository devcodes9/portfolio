import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getContentSlugs("notes");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getContentBySlug("notes", slug);
  if (!result) return {};

  return {
    title: `${result.frontmatter.title} · Dev Dalia`,
    description: result.frontmatter.description,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getContentBySlug("notes", slug);

  if (!result) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 pt-12 pb-20">
      <header className="mb-10">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] leading-[1.2] mb-3">
          {result.frontmatter.title}
        </h1>
        <p className="text-[13px] font-mono text-muted-foreground/60">
          {result.frontmatter.date}
        </p>
      </header>

      <div className="prose-custom">{result.content}</div>

      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/notes"
          className="text-[14px] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to notes
        </Link>
      </footer>
    </article>
  );
}
