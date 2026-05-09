type SectionHeaderProps = {
  label: string;
  count?: string;
};

export function SectionHeader({ label, count }: SectionHeaderProps) {
  return (
    <h2 className="mb-7 flex items-center justify-between border-b border-foreground pb-2 text-[11px] font-medium uppercase tracking-[0.18em]">
      <span>
        <span className="text-[var(--accent-warm)]">/ </span>
        {label}
      </span>
      {count && <span className="text-muted-foreground">{count}</span>}
    </h2>
  );
}
