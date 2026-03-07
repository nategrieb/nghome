import type { CSSProperties } from "react";

import { buildLaunchUrl, type AppDefinition } from "@/lib/apps";
import { BrandIcon } from "@/components/BrandIcon";

type AppCardProps = {
  app: AppDefinition;
  index: number;
};

export function AppCard({ app, index }: AppCardProps) {
  const launchUrl = buildLaunchUrl(app);
  const isConfigured = Boolean(launchUrl);
  const delay = `${80 + index * 60}ms`;

  return (
    <article
      className="motion-rise relative flex min-h-64 flex-col justify-between border border-zinc-300/50 bg-white/75 p-5 backdrop-blur-[1px]"
      style={{ "--stagger": delay } as CSSProperties}
      aria-label={`${app.name} application card`}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BrandIcon shape={app.iconShape} className="h-8 w-8" />
          <h2 className="text-sm font-bold tracking-[0.22em] text-zinc-900">{app.name}</h2>
        </div>

        <p className="max-w-prose text-sm leading-6 text-zinc-600">{app.description}</p>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-zinc-200 pt-4">
        <span
          className={`inline-flex items-center border px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] ${
            isConfigured
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {isConfigured ? "Configured" : "URL Missing"}
        </span>

        {isConfigured ? (
          <a
            href={launchUrl!}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative inline-flex h-10 items-center justify-center rounded-none border border-transparent px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-all duration-200 hover:border-zinc-300/80 hover:bg-white/70 hover:text-zinc-900 focus-visible:border-zinc-300/80 focus-visible:bg-white/70 focus-visible:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 active:scale-95"
          >
            Open App
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 left-2 right-2 h-px origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 group-active:scale-x-100"
            />
          </a>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex h-10 items-center justify-center border border-zinc-200 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400"
          >
            Unavailable
          </span>
        )}
      </div>
    </article>
  );
}
