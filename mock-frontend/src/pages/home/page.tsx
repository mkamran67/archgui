import { useEffect, useMemo, useState } from "react";
import AppCard from "@/pages/home/components/AppCard";
import { apps, categories } from "@/mocks/apps";

export default function Home() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"stars" | "name">("stars");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("archgui-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("archgui-theme", theme);
  }, [theme]);

  const filtered = useMemo(() => {
    let list = apps.filter((a) => (category === "All" ? true : a.category === category));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.features.some((f) => f.toLowerCase().includes(q)) ||
          a.distros.some((d) => d.name.toLowerCase().includes(q)),
      );
    }
    return [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      const sa = a.stars === "—" ? -1 : parseInt(a.stars.replace(/[^\d]/g, ""), 10);
      const sb = b.stars === "—" ? -1 : parseInt(b.stars.replace(/[^\d]/g, ""), 10);
      return sb - sa;
    });
  }, [category, query, sort]);

  return (
    <div className="min-h-screen bg-ink-950 text-cream-50 selection:bg-lime-400 selection:text-ink-950">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-ink-950/70 border-b border-ink-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-lime-400 text-ink-950">
              <i className="ri-apps-2-line text-lg"></i>
            </div>
            <span className="font-mono font-bold tracking-tight">arch<span className="text-lime-400">gui</span>.catalog</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-cream-200/80">
            <a href="#directory" className="hover:text-lime-400 cursor-pointer">Directory</a>
            <a href="#about" className="hover:text-lime-400 cursor-pointer">About</a>
            <a href="#submit" className="hover:text-lime-400 cursor-pointer">Submit an app</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-ink-700 hover:border-lime-400 text-cream-200/80 cursor-pointer"
              title="Toggle theme"
            >
              <i className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}></i>
            </button>
            <a
              href="#directory"
              className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-lime-400 text-ink-950 font-semibold text-sm hover:bg-lime-500 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-search-line"></i> Browse apps
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden noise">
        <div className="absolute inset-0 grid-bg opacity-70"></div>
        <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-lime-400/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-20 w-[520px] h-[520px] rounded-full bg-rust-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border border-ink-700 bg-ink-900/60 text-cream-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-400 blink"></span>
            {apps.length} apps catalogued · updated weekly
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl leading-[1.02] font-bold tracking-tight max-w-4xl mx-auto">
            The GUI apps
            <span className="block text-lime-400">Arch users actually run.</span>
          </h1>
          <p className="mt-6 text-lg text-cream-200/70 max-w-2xl mx-auto">
            A hand-picked, tested catalog of graphical software for Arch-based distributions. Every entry links to its source repo, lists its key features, system requirements, and the distros it's been verified on.
          </p>

          {/* Search */}
          <div className="mt-8 flex items-center gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-cream-200/70 text-base"></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search apps, features, distros…"
                className="w-full h-12 pl-11 pr-4 rounded-md border border-ink-600 bg-ink-900 text-base text-cream-50 placeholder:text-cream-200/70 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/25"
              />
            </div>
            <button
              onClick={() => setSort(sort === "stars" ? "name" : "stars")}
              className="h-12 px-4 rounded-md border border-ink-600 bg-ink-900 hover:border-lime-400 font-mono text-sm text-cream-100 cursor-pointer whitespace-nowrap"
              title="Toggle sort"
            >
              <i className="ri-sort-desc"></i> {sort === "stars" ? "Stars" : "A–Z"}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 font-mono text-sm text-cream-200/60">
            <div className="flex items-center gap-2"><i className="ri-box-3-line text-lime-400"></i> {apps.length} apps</div>
            <div className="flex items-center gap-2"><i className="ri-git-repository-line text-lime-400"></i> 6 categories</div>
            <div className="flex items-center gap-2"><i className="ri-global-line text-lime-400"></i> 8 distros covered</div>
            <div className="flex items-center gap-2"><i className="ri-verified-badge-line text-lime-400"></i> CI-tested</div>
          </div>
        </div>
      </section>

      {/* DIRECTORY */}
      <section id="directory" className="relative py-16 bg-ink-900 border-y border-ink-800">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-mono cursor-pointer whitespace-nowrap transition ${
                    category === c ? "bg-lime-400 text-ink-950" : "bg-ink-800 text-cream-200/70 hover:text-cream-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((app) => (
                <AppCard key={app.name} app={app} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-ink-800 text-cream-200/40">
                <i className="ri-search-eye-line text-2xl"></i>
              </div>
              <p className="mt-4 text-cream-200/60">No apps match “{query}”. Try a different term or category.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="mt-4 inline-flex items-center gap-2 h-9 px-4 rounded-md border border-ink-700 hover:border-lime-400 text-sm cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line"></i> Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { icon: "ri-git-merge-line", title: "Source-first", desc: "Every listing links straight to its upstream repository. We don't repackage or rebrand — you always audit the original code." },
            { icon: "ri-flask-line", title: "Actually tested", desc: "Each app is installed and smoke-tested in real VMs across Arch, Manjaro, EndeavourOS and friends before we mark a distro as supported." },
            { icon: "ri-file-list-3-line", title: "Plain requirements", desc: "Memory, disk, toolkit and dependencies listed upfront, so you know what you're installing before the package manager does." },
          ].map((c) => (
            <div key={c.title} className="p-6 rounded-lg border border-ink-800 bg-ink-900">
              <div className="w-10 h-10 flex items-center justify-center rounded-md bg-ink-800 text-lime-400">
                <i className={`${c.icon} text-lg`}></i>
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-cream-200/60 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMIT */}
      <section id="submit" className="relative py-20 bg-ink-900 border-t border-ink-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-mono text-xs text-lime-400">// contribute</div>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Know a great GUI we missed?</h2>
          <p className="mt-4 text-cream-200/60 max-w-xl mx-auto">
            Open an issue or pull request with the app's repo, a screenshot, and the distros you've tested it on. We'll verify it and add it to the catalog.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="https://github.com/archgui/catalog" target="_blank" rel="noreferrer nofollow" className="inline-flex items-center gap-2 px-6 h-12 rounded-md bg-lime-400 text-ink-950 font-semibold hover:bg-lime-500 cursor-pointer whitespace-nowrap">
              <i className="ri-git-pull-request-line"></i> Submit on GitHub
            </a>
            <a href="https://github.com/archgui/catalog/issues" target="_blank" rel="noreferrer nofollow" className="inline-flex items-center gap-2 px-6 h-12 rounded-md border border-ink-700 hover:border-lime-400 font-mono text-sm cursor-pointer whitespace-nowrap">
              <i className="ri-discuss-line"></i> Open an issue
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-900 border-t border-ink-800">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream-200/50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center rounded bg-lime-400 text-ink-950"><i className="ri-apps-2-line text-sm"></i></div>
            <span className="font-mono">archgui.catalog · not affiliated with Arch Linux</span>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs">
            <a href="#directory" className="hover:text-lime-400 cursor-pointer">apps</a>
            <a href="#about" className="hover:text-lime-400 cursor-pointer">about</a>
            <a href="#submit" className="hover:text-lime-400 cursor-pointer">submit</a>
            <a href="https://github.com/archgui/catalog" target="_blank" rel="noreferrer nofollow" className="hover:text-lime-400 cursor-pointer">github</a>
          </div>
          <div className="font-mono text-xs">all apps © their respective owners</div>
        </div>
      </footer>
    </div>
  );
}