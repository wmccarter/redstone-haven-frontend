interface HoverHintProps {
  text: string;
  className?: string;
}

export default function HoverHint({ text, className = '' }: HoverHintProps) {
  return (
    <span
      className={`pointer-events-none absolute z-20 rounded-lg border border-cyan-300/35 bg-slate-950/95 px-3 py-2 text-[11px] leading-snug text-cyan-100 opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-all duration-100 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${className}`}
    >
      {text}
    </span>
  );
}