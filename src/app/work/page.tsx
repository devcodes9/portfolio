import { Projects } from "@/components/projects";
import { SectionHeader } from "@/components/section-header";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work · Dev Dalia",
  description:
    "Projects in AI engineering, full-stack development, and side projects shipped over the years.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-7 pb-20 sm:px-10">
      <SectionHeader label="Work" count={`${projects.length} projects`} />
      <Projects />
    </div>
  );
}
