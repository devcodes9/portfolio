import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-7 pb-18">
      <div className="grid items-start gap-14 sm:grid-cols-[1fr_200px]">
        <div>
          <h1 className="text-[clamp(56px,6.6vw,80px)] font-bold leading-[0.96] tracking-[-0.035em]">
            Hi, I&apos;m
            <span className="block">Dev Dalia.</span>
          </h1>
          <p className="mt-[22px] text-[13px] font-mono uppercase tracking-[0.06em] text-muted-foreground">
            Founding AI Engineer · BuildwayAI · Europe · Remote
          </p>
          <p className="mt-7 max-w-[560px] text-[17px] leading-[1.55] text-foreground/90">
            I build AI systems + full-stack SaaS: agent runtimes, retrieval pipelines, orchestration, observability, payment + auth infra, security, whole product surface. Right now: <strong>Alawyer</strong>, an AI legal research platform for the Austrian market at <strong>BuildwayAI</strong>. Before that, 1.5 years shipping core platform features for logistics infrastructure at <strong>Shipmnts</strong>.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-mono uppercase tracking-[0.08em] text-muted-foreground">
            <a className="relative inline-flex items-center underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)] before:absolute before:inset-x-0 before:-inset-y-[14px] before:content-['']" href="https://github.com/devcodes9" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="relative inline-flex items-center underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)] before:absolute before:inset-x-0 before:-inset-y-[14px] before:content-['']" href="https://linkedin.com/in/devdalia" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="relative inline-flex items-center underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)] before:absolute before:inset-x-0 before:-inset-y-[14px] before:content-['']" href="https://x.com/devcodes9" target="_blank" rel="noopener noreferrer">X</a>
            <a className="relative inline-flex items-center underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)] before:absolute before:inset-x-0 before:-inset-y-[14px] before:content-['']" href="mailto:devdalia9@gmail.com">Email</a>
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
        </div>
      </div>
    </section>
  );
}
