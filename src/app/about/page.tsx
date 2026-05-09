import { SectionHeader } from "@/components/section-header";
import { Experience } from "@/components/experience";
import { experience } from "@/data/experience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Dev Dalia",
  description:
    "AI engineer at BuildwayAI. B.Tech from PDEU. Building with TypeScript, Next.js, and Claude.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-6 pt-7 pb-20 sm:px-10">
      <div className="max-w-3xl space-y-4 pb-12 pt-4 text-[15px] leading-[1.7] text-foreground/85">
        <p>
          I&apos;m Dev Dalia, an AI engineer based in Surat, India.
          I work remotely with{" "}
          <a
            href="https://buildway.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
          >
            BuildwayAI
          </a>
          {" "}(Vienna), building Alawyer — an AI legal research platform
          for the Austrian market.
        </p>
        <p>
          Before that, 1.5 years at{" "}
          <a
            href="https://shipmnts.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
          >
            Shipmnts
          </a>
          {" "}on full-stack logistics infrastructure, and freelance
          backend work for{" "}
          <a
            href="https://zeiierman.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
          >
            Zeiierman Trading
          </a>.
        </p>
        <p>
          B.Tech in Computer Engineering from PDEU (9.81 CGPA). Led the tech
          team at Encode (CS club). Won DotSlash 7.0 — one of Gujarat&apos;s
          largest hackathons.
        </p>
      </div>

      <SectionHeader label="Experience" count={`${experience.length} roles`} />
      <Experience />

      <SectionHeader label="Contact" count="4 channels" />
      <section className="pb-10">
        <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[12px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
          <li>
            <a
              className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
              href="mailto:devdalia9@gmail.com"
            >
              Email
            </a>
          </li>
          <li>
            <a
              className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
              href="https://github.com/devcodes9"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
              href="https://linkedin.com/in/devdalia"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
              href="https://x.com/devcodes9"
              target="_blank"
              rel="noopener noreferrer"
            >
              X / @devcodes9
            </a>
          </li>
        </ul>
      </section>

      <section className="pb-20">
        <p className="text-[15px] leading-[1.7] text-foreground/85">
          Want to chat about Claude Code, agent tooling, or building with LLMs?{" "}
          <a
            href="https://cal.com/devdalia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px] decoration-[var(--accent-warm)] hover:text-[var(--accent-warm)]"
          >
            Book a 30-minute call ↗
          </a>
          . Free. No agenda required.
        </p>
      </section>
    </div>
  );
}
