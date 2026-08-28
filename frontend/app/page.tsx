"use client";

import { useEffect, useMemo, useState } from "react";
import {
  RiAddLine,
  RiApps2Line,
  RiArrowDownSLine,
  RiCheckLine,
  RiCloseLine,
  RiDiscussLine,
  RiExternalLinkLine,
  RiFileList3Line,
  RiGitPullRequestLine,
  RiGitRepositoryLine,
  RiMenuLine,
  RiMoonLine,
  RiRefreshLine,
  RiSearchLine,
  RiStarFill,
  RiSunLine,
} from "@remixicon/react";
import { apps, categories, type CatalogApp } from "./catalog";

const distributions = Array.from(
  new Set(apps.flatMap((app) => app.distros.map(([name]) => name))),
).sort();

function formatStars(stars: number | null) {
  if (stars === null) return "Not listed";
  return `${stars.toLocaleString("en-US")} stars`;
}

function getRequirement(app: CatalogApp, label: string) {
  return app.requirements.find(([item]) => item === label)?.[1] ?? "Not listed";
}

type AppCardProps = {
  app: CatalogApp;
  expanded: boolean;
  selected: boolean;
  selectionDisabled: boolean;
  onToggleDetails: () => void;
  onToggleSelection: () => void;
};

function AppCard({ app, expanded, selected, selectionDisabled, onToggleDetails, onToggleSelection }: AppCardProps) {
  const detailsId = `details-${app.name.replaceAll(" ", "-").toLowerCase()}`;

  return (
    <article className={`app-card${selected ? " selected" : ""}`} data-testid="app-card" aria-label={`${app.name} application`}>
      <div className="card-topline">
        <span className="category-tag">{app.category}</span>
        <button
          className="compare-toggle"
          type="button"
          onClick={onToggleSelection}
          aria-pressed={selected}
          aria-label={`${selected ? "Remove" : "Add"} ${app.name} ${selected ? "from" : "to"} comparison`}
          disabled={selectionDisabled && !selected}
        >
          {selected ? <RiCheckLine size={17} /> : <RiAddLine size={17} />}
          {selected ? "Selected" : "Compare"}
        </button>
      </div>

      <div className="card-heading">
        <div>
          <h3>{app.name}</h3>
          <p>{app.tagline}</p>
        </div>
        <span className="popularity" aria-label={formatStars(app.stars)}>
          <RiStarFill size={14} />
          {app.stars === null ? "Not listed" : app.stars.toLocaleString("en-US")}
        </span>
      </div>

      <p className="card-description">{app.description}</p>

      <div className="compatibility">
        <span>Works on</span>
        <div>
          {app.distros.map(([name, status]) => (
            <span className={`support ${status.toLowerCase()}`} key={name} title={`${status} support`}>
              {name}
            </span>
          ))}
        </div>
      </div>

      {expanded ? (
        <div className="card-details" id={detailsId}>
          <div>
            <h4>Highlights</h4>
            <ul>
              {app.features.map((feature) => (
                <li key={feature}><RiCheckLine size={16} /><span>{feature}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Requirements</h4>
            <dl>
              {app.requirements.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      ) : null}

      <div className="card-footer">
        <span>{app.license}</span>
        <div>
          <button
            className="text-button"
            type="button"
            aria-expanded={expanded}
            aria-controls={detailsId}
            aria-label={`${expanded ? "Hide" : "Show"} ${app.name} details`}
            onClick={onToggleDetails}
          >
            {expanded ? "Less detail" : "More detail"}
            <RiArrowDownSLine size={18} />
          </button>
          <a className="repo-link" href={app.repo} target="_blank" rel="noreferrer nofollow" aria-label={`Open ${app.name} repository in a new tab`}>
            Repository <RiExternalLinkLine size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

function Comparison({ selectedApps, onClose }: { selectedApps: CatalogApp[]; onClose: () => void }) {
  const label = selectedApps.map((app) => app.name).join(" vs ");
  const rows = [
    ["Category", ...selectedApps.map((app) => app.category)],
    ["Popularity", ...selectedApps.map((app) => formatStars(app.stars))],
    ["Toolkit", ...selectedApps.map((app) => getRequirement(app, "Toolkit"))],
    ["Memory", ...selectedApps.map((app) => getRequirement(app, "Memory"))],
    ["License", ...selectedApps.map((app) => app.license)],
    ["Supported on", ...selectedApps.map((app) => app.distros.map(([name]) => name).join(", "))],
  ];

  return (
    <section className="comparison" role="region" aria-label={label}>
      <div className="comparison-heading">
        <div>
          <span>Side-by-side</span>
          <h2>{label}</h2>
        </div>
        <button className="icon-button" type="button" onClick={onClose} aria-label="Close comparison"><RiCloseLine size={20} /></button>
      </div>
      <div className="comparison-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Compare</th>
              {selectedApps.map((app) => <th scope="col" key={app.name}>{app.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([labelValue, ...values]) => (
              <tr key={labelValue}>
                <th scope="row">{labelValue}</th>
                {values.map((value, index) => <td key={`${labelValue}-${selectedApps[index].name}`}>{value}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [distribution, setDistribution] = useState("All distributions");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"stars" | "name">("stars");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [expandedApps, setExpandedApps] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("archgui-theme");
    if (saved !== "light") return;
    const timer = window.setTimeout(() => setTheme("light"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("archgui-theme", theme);
  }, [theme]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return apps
      .filter((app) => category === "All" || app.category === category)
      .filter((app) => distribution === "All distributions" || app.distros.some(([name]) => name === distribution))
      .filter((app) => !needle || [app.name, app.tagline, app.description, ...app.features, ...app.distros.map(([name]) => name)].some((text) => text.toLowerCase().includes(needle)))
      .sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : (b.stars ?? -1) - (a.stars ?? -1));
  }, [category, distribution, query, sort]);

  const selectedApps = selectedNames
    .map((name) => apps.find((app) => app.name === name))
    .filter((app): app is CatalogApp => Boolean(app));

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setDistribution("All distributions");
  }

  function toggleSelection(name: string) {
    setComparisonOpen(false);
    setSelectedNames((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name].slice(0, 3));
  }

  return (
    <main>
      <header className="site-header">
        <div className="shell nav">
          <a href="#top" className="brand" aria-label="archgui catalog home">
            <span><RiApps2Line size={20} /></span>
            arch<strong>gui</strong>.catalog
          </a>
          <nav id="mobile-navigation" aria-label="Primary navigation" className={mobileNavOpen ? "open" : ""}>
            <a href="#directory" onClick={() => setMobileNavOpen(false)}>Directory</a>
            <a href="#about" onClick={() => setMobileNavOpen(false)}>How it works</a>
            <a href="#submit" onClick={() => setMobileNavOpen(false)}>Submit an app</a>
          </nav>
          <div className="nav-actions">
            <button className="icon-button" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
              {theme === "dark" ? <RiSunLine size={19} /> : <RiMoonLine size={19} />}
            </button>
            <button className="icon-button menu-button" type="button" aria-expanded={mobileNavOpen} aria-controls="mobile-navigation" onClick={() => setMobileNavOpen((open) => !open)} aria-label="Toggle navigation">
              {mobileNavOpen ? <RiCloseLine size={21} /> : <RiMenuLine size={21} />}
            </button>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="shell hero-inner">
          <div>
            <span className="hero-note">Independent Arch app directory</span>
            <h1>Find the right GUI.<br /><strong>Skip the guesswork.</strong></h1>
          </div>
          <div className="hero-copy">
            <p>Discover graphical tools by job, distro support, and system fit. Shortlist promising apps, then compare the details that matter.</p>
            <a className="primary" href="#directory"><RiSearchLine size={18} />Explore {apps.length} apps</a>
          </div>
        </div>
      </section>

      <section id="directory" className="directory">
        <div className="shell">
          <div className="directory-heading">
            <div>
              <h2>Browse the directory</h2>
              <p>Start broad, then narrow by the distribution you use.</p>
            </div>
            <p className="result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "app" : "apps"} found</p>
          </div>

          <div className="toolbar">
            <label className="search-field">
              <span className="sr-only">Search apps</span>
              <RiSearchLine size={19} />
              <input type="search" placeholder="Search by app, task, or feature" value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <label className="select-field">
              <span>Distribution</span>
              <select value={distribution} onChange={(event) => setDistribution(event.target.value)}>
                <option>All distributions</option>
                {distributions.map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <label className="select-field sort-field">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as "stars" | "name")}>
                <option value="stars">Popularity</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          <div className="filters" aria-label="Filter by category">
            {categories.map((item) => (
              <button key={item} type="button" className={category === item ? "active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>

          {comparisonOpen && selectedApps.length >= 2 ? <Comparison selectedApps={selectedApps} onClose={() => setComparisonOpen(false)} /> : null}

          {filtered.length ? (
            <div className="app-grid">
              {filtered.map((app) => (
                <AppCard
                  app={app}
                  key={app.name}
                  expanded={expandedApps.includes(app.name)}
                  selected={selectedNames.includes(app.name)}
                  selectionDisabled={selectedNames.length === 3}
                  onToggleDetails={() => setExpandedApps((current) => current.includes(app.name) ? current.filter((name) => name !== app.name) : [...current, app.name])}
                  onToggleSelection={() => toggleSelection(app.name)}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <span><RiSearchLine size={26} /></span>
              <h3>No matching apps</h3>
              <p>Try another term or remove one of your filters.</p>
              <button type="button" onClick={clearFilters}><RiRefreshLine size={17} />Clear filters</button>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="about shell">
        <div>
          <span className="section-label">A directory, not a verdict</span>
          <h2>Enough context to choose your next step.</h2>
        </div>
        <div className="about-copy">
          <p>We organize what each app does, where it runs, and what it needs. You stay in control of the final evaluation.</p>
          <ul>
            <li><RiGitRepositoryLine size={19} />Direct links to upstream repositories</li>
            <li><RiFileList3Line size={19} />Requirements shown in consistent fields</li>
            <li><RiCheckLine size={19} />Support status separated by distribution</li>
          </ul>
        </div>
      </section>

      <section id="submit" className="submit">
        <div className="shell submit-inner">
          <div>
            <h2>Something worth adding?</h2>
            <p>Share the repository and the distributions you have used it on.</p>
          </div>
          <div>
            <a className="primary" href="https://github.com/archgui/catalog"><RiGitPullRequestLine size={19} />Submit on GitHub</a>
            <a className="secondary" href="https://github.com/archgui/catalog/issues"><RiDiscussLine size={19} />Open an issue</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell">
          <span className="footer-brand"><i><RiApps2Line size={15} /></i>archgui.catalog</span>
          <span>Independent and not affiliated with Arch Linux</span>
          <a href="https://github.com/archgui/catalog">GitHub</a>
        </div>
      </footer>

      {selectedApps.length ? (
        <aside className="compare-dock" aria-label="Comparison shortlist">
          <div>
            <span>{selectedApps.length}/3 selected</span>
            <strong>{selectedApps.map((app) => app.name).join(", ")}</strong>
          </div>
          <div>
            <button className="text-button" type="button" onClick={() => { setSelectedNames([]); setComparisonOpen(false); }}>Clear</button>
            <button className="primary compact" type="button" disabled={selectedApps.length < 2} onClick={() => { setComparisonOpen(true); document.querySelector("#directory")?.scrollIntoView?.(); }}>
              Compare {selectedApps.length} {selectedApps.length === 1 ? "app" : "apps"}
            </button>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
