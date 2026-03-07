export default function Loading() {
  return (
    <section className="border border-zinc-300/50 bg-white/70 p-6" aria-live="polite" aria-busy="true">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">Loading</p>
      <p className="mt-2 text-sm text-zinc-600">Preparing command center modules...</p>
    </section>
  );
}
