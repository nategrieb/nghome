import { buildLaunchUrl, apps } from "@/lib/apps";
import { BrandIcon } from "@/components/BrandIcon";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col py-4 md:py-10">
      {apps.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {apps.map((app) => {
            const launchUrl = buildLaunchUrl(app);
            if (!launchUrl) {
              return (
                <div
                  key={app.key}
                  className="flex min-h-28 flex-col items-center justify-center gap-2 border border-zinc-200 bg-zinc-50 px-6 text-center"
                  aria-disabled="true"
                >
                  <p className="flex items-center gap-3 text-2xl font-semibold uppercase tracking-[0.12em] text-zinc-400 md:text-3xl">
                    <BrandIcon shape={app.iconShape} className="h-8 w-8 md:h-10 md:w-10" />
                    {app.name}
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Set app URL env var to enable</p>
                </div>
              );
            }

            return (
              <a
                key={app.key}
                href={launchUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group relative flex min-h-28 items-center justify-center gap-4 bg-transparent px-6 text-center text-2xl font-semibold uppercase tracking-[0.12em] text-zinc-900 transition-all duration-200 hover:bg-white/55 focus-visible:bg-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 md:text-3xl"
              >
                <BrandIcon shape={app.iconShape} className="h-8 w-8 md:h-10 md:w-10" />
                {app.name}
                <span
                  aria-hidden="true"
                  className="absolute bottom-4 left-1/2 h-px w-32 -translate-x-1/2 origin-center scale-x-0 bg-zinc-500/70 transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              </a>
            );
          })}
        </div>
      ) : (
        <div className="border border-rose-200 bg-rose-50 p-5 text-center text-sm text-rose-800">
          No apps are configured yet. Add entries in <code>lib/apps.ts</code>.
        </div>
      )}
    </section>
  );
}
