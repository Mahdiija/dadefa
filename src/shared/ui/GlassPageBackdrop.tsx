export default function GlassPageBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {/* base */}
      <div className="absolute inset-0 bg-slate-950/30" />

      {/* soft blobs */}
      <div
        className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "color-mix(in oklab, var(--color-brand-blue) 35%, transparent)",
        }}
      />
      <div
        className="absolute -bottom-28 -left-28 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "rgba(var(--brand-paper-rgb),0.10)" }}
      />

      {/* subtle noise (optional but makes glass nicer) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
