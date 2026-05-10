import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-3xl mx-auto px-6 flex items-center justify-between text-[13px] text-muted-foreground">
        <span className="font-mono">Dev Dalia</span>
        <div className="flex items-center gap-4">
          <Link href="/writing" className="hover:text-foreground transition-colors">Writing</Link>
          <Link href="/work" className="hover:text-foreground transition-colors">Work</Link>
          <Link href="/oss" className="hover:text-foreground transition-colors">OSS</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
        </div>
      </div>
    </footer>
  );
}
