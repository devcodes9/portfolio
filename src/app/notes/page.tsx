import { getContentList } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes · Dev Dalia",
  description: "Short-form field notes on AI engineering, tools, and building.",
};

export default async function NotesPage() {
  const notes = await getContentList("notes");

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
      <SectionHeader label="Notes" />

      {notes.length === 0 ? (
        <p className="text-[15px] text-muted-foreground">
          No notes yet. Stay tuned.
        </p>
      ) : (
        <ul className="space-y-0">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-border">
              <Link href={`/notes/${note.slug}`} className="block py-5 group">
                <span className="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors block mb-1">
                  {note.title}
                </span>
                <span className="text-[13px] font-mono text-muted-foreground/60 block mb-1.5">
                  {note.date}
                </span>
                <span className="text-[14px] text-muted-foreground block">
                  {note.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
