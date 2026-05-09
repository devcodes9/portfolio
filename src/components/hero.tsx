import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-7 pb-20">
      <div className="grid items-end gap-14 sm:grid-cols-[1fr_200px]">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
            dev.dalia — engineer + writing + open source
          </p>
          <h1 className="mt-4 text-[clamp(56px,6.6vw,80px)] font-bold leading-[0.96] tracking-[-0.035em]">
            Hi, I&apos;m
            <span className="block">Dev Dalia.</span>
          </h1>
          <p className="mt-[22px] text-[13px] font-mono uppercase tracking-[0.06em] text-muted-foreground">
            Founding AI Engineer · BuildwayAI · Surat, India
          </p>
          <p className="mt-7 max-w-[560px] text-[17px] leading-[1.55] text-foreground/90">
            I build with LLMs for a living. Right now: <strong>Alawyer</strong>, an AI legal research platform for the Austrian market at <strong>BuildwayAI</strong>. Mostly <code className="rounded-[3px] border border-border bg-muted px-1.5 py-[1px] font-mono text-[14px]">TypeScript</code>, <code className="rounded-[3px] border border-border bg-muted px-1.5 py-[1px] font-mono text-[14px]">Claude API</code>, <code className="rounded-[3px] border border-border bg-muted px-1.5 py-[1px] font-mono text-[14px]">MCP</code>, and <code className="rounded-[3px] border border-border bg-muted px-1.5 py-[1px] font-mono text-[14px]">Next.js</code>. Before that, 1.5 years shipping logistics infrastructure at <strong>Shipmnts</strong>. I write about the craft of building with LLMs.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
            <a className="inline-flex min-h-11 items-center border-b border-border pb-0.5 hover:text-[var(--accent-warm)]" href="https://github.com/devcodes9" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="inline-flex min-h-11 items-center border-b border-border pb-0.5 hover:text-[var(--accent-warm)]" href="https://linkedin.com/in/devdalia" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="inline-flex min-h-11 items-center border-b border-border pb-0.5 hover:text-[var(--accent-warm)]" href="https://x.com/devcodes9" target="_blank" rel="noopener noreferrer">X / @devcodes9</a>
            <a className="inline-flex min-h-11 items-center border-b border-border pb-0.5 hover:text-[var(--accent-warm)]" href="mailto:devdalia9@gmail.com">Email</a>
            <a className="inline-flex min-h-11 items-center border-b border-border pb-0.5 hover:text-[var(--accent-warm)]" href="#">Resume</a>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <Image
            src="/headshot.png"
            alt="Dev Dalia"
            width={168}
            height={168}
            className="rounded-full border border-foreground object-cover"
            priority
          />
          <p className="text-right text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
            Surat → Vienna
          </p>
          <p className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.12em] text-green-700 dark:text-green-400">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
            DotSlash 7.0 Winner
          </p>
        </div>
      </div>
    </section>
  );
}
