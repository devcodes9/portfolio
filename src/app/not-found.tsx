import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-40 pb-20 text-center">
      <h1 className="text-[28px] font-medium tracking-[-0.03em] mb-3">
        404
      </h1>
      <p className="text-[15px] text-muted-foreground mb-8">
        This page doesn't exist.
      </p>
      <div className="flex justify-center gap-4 text-[14px]">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
        <Link
          href="/writing"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Writing
        </Link>
      </div>
    </div>
  );
}
