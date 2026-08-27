import type { GuiApp } from "@/mocks/apps";

const statusStyles: Record<string, string> = {
  Stable: "bg-lime-400/15 text-lime-400",
  Beta: "bg-rust-500/15 text-rust-500",
  Experimental: "bg-cream-200/10 text-cream-200/70",
};

export default function AppCard({ app }: { app: GuiApp }) {
  return (
    <article className="group rounded-lg border border-ink-800 bg-ink-900 overflow-hidden hover:border-lime-400/60 transition flex flex-col">
      {/* Screenshot */}
      <a href={app.repo} target="_blank" rel="noreferrer nofollow" className="relative block overflow-hidden cursor-pointer">
        <div className="relative h-44 w-full overflow-hidden bg-ink-800">
          <img
            src={app.image}
            alt={`${app.name} screenshot`}
            title={`${app.name} — ${app.tagline}`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
          />
        </div>
        <span className="absolute top-3 left-3 px-2 py-1 rounded font-mono text-[10px] bg-ink-950/80 border border-ink-700 text-cream-200/80">
          {app.category}
        </span>
        <span className="absolute bottom-3 right-3 px-2 py-1 rounded font-mono text-[10px] bg-ink-950/80 text-cream-200/70">
          {app.license}
        </span>
      </a>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{app.name}</h3>
            <p className="mt-0.5 text-sm text-cream-200/60">{app.tagline}</p>
          </div>
          <span className="inline-flex items-center gap-1 shrink-0 font-mono text-xs text-cream-200/50">
            <i className="ri-star-fill text-lime-400/70"></i>{app.stars}
          </span>
        </div>

        <p className="mt-3 text-sm text-cream-200/70 leading-relaxed">{app.description}</p>

        {/* Features */}
        <ul className="mt-4 space-y-1.5">
          {app.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-cream-200/70">
              <i className="ri-check-line text-lime-400 mt-0.5"></i>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Requirements */}
        <div className="mt-4 pt-4 border-t border-ink-800">
          <div className="text-[10px] uppercase tracking-widest text-cream-200/40 font-mono mb-2">System requirements</div>
          <div className="flex flex-wrap gap-1.5">
            {app.requirements.map((r) => (
              <span key={r.label} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-ink-800 text-[11px] font-mono text-cream-200/70">
                <span className="text-cream-200/40">{r.label}</span>
                {r.value}
              </span>
            ))}
          </div>
        </div>

        {/* Distros */}
        <div className="mt-4 pt-4 border-t border-ink-800">
          <div className="text-[10px] uppercase tracking-widest text-cream-200/40 font-mono mb-2">Tested / supported</div>
          <div className="flex flex-wrap gap-1.5">
            {app.distros.map((d) => (
              <span key={d.name} className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono ${statusStyles[d.status]}`}>
                <i className="ri-record-circle-fill text-[6px]"></i>
                {d.name}
                <span className="opacity-60">· {d.status}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Repo link */}
        <a
          href={app.repo}
          target="_blank"
          rel="noreferrer nofollow"
          className="mt-5 inline-flex items-center justify-center gap-2 h-10 rounded-md border border-ink-700 hover:border-lime-400 hover:text-lime-400 font-mono text-sm cursor-pointer whitespace-nowrap transition"
        >
          <i className="ri-git-repository-line"></i> View repository
        </a>
      </div>
    </article>
  );
}