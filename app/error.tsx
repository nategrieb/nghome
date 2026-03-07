"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="border border-rose-200 bg-rose-50 p-6" role="alert">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-rose-700">Something went wrong</p>
      <p className="mt-2 text-sm text-rose-800">{error.message || "Unexpected error while loading command center."}</p>
      <button
        type="button"
        onClick={reset}
        className="group relative mt-5 inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 transition-all duration-200 hover:border-rose-300 hover:bg-white/70 hover:text-rose-900 focus-visible:border-rose-300 focus-visible:bg-white/70 focus-visible:text-rose-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
      >
        Retry
        <span
          aria-hidden="true"
          className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-rose-600/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </button>
    </section>
  );
}
