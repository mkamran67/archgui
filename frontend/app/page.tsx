"use client";

import { useEffect, useMemo, useState } from "react";
import { RiApps2Line, RiBox3Line, RiCheckLine, RiDiscussLine, RiFileList3Line, RiFlaskLine, RiGitMergeLine, RiGitPullRequestLine, RiGitRepositoryLine, RiGlobalLine, RiMoonLine, RiRecordCircleFill, RiRefreshLine, RiSearchEyeLine, RiSearchLine, RiSortDesc, RiStarFill, RiSunLine, RiVerifiedBadgeLine } from "@remixicon/react";
import { apps, categories, type CatalogApp } from "./catalog";

const iconSize = 18;

function AppCard({ app }: { app: CatalogApp }) {
  return <article className="card">
    <a className="screenshot" href={app.repo} target="_blank" rel="noreferrer nofollow">
      {/* The supplied mock uses generated remote screenshots, so a regular image preserves its exact URLs. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={app.image} alt={`${app.name} screenshot`} />
      <span className="category-label">{app.category}</span><span className="license">{app.license}</span>
    </a>
    <div className="card-body">
      <div className="card-title"><div><h3>{app.name}</h3><p>{app.tagline}</p></div><span className="stars"><RiStarFill size={14} />{app.stars}</span></div>
      <p className="description">{app.description}</p>
      <ul className="features">{app.features.map((feature) => <li key={feature}><RiCheckLine size={17} /><span>{feature}</span></li>)}</ul>
      <div className="meta"><h4>System requirements</h4><div className="pills">{app.requirements.map(([label, value]) => <span key={label}><i>{label}</i>{value}</span>)}</div></div>
      <div className="meta"><h4>Tested / supported</h4><div className="pills">{app.distros.map(([name, status]) => <span className={`status ${status.toLowerCase()}`} key={name}><RiRecordCircleFill size={7} />{name}<i>· {status}</i></span>)}</div></div>
      <a className="repo" href={app.repo} target="_blank" rel="noreferrer nofollow"><RiGitRepositoryLine size={17} />View repository</a>
    </div>
  </article>;
}

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"stars" | "name">("stars");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("archgui-theme");
    if (saved !== "light") return;
    const timer = window.setTimeout(() => setTheme("light"), 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle("light", theme === "light"); localStorage.setItem("archgui-theme", theme); }, [theme]);

  const filtered = useMemo(() => apps.filter((app) => category === "All" || app.category === category).filter((app) => {
    const needle = query.trim().toLowerCase();
    return !needle || [app.name, app.tagline, app.description, ...app.features, ...app.distros.map(([name]) => name)].some((text) => text.toLowerCase().includes(needle));
  }).sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : parseFloat(b.stars.replace("k", "000")) - parseFloat(a.stars.replace("k", "000"))), [category, query, sort]);

  return <main>
    <header><div className="shell nav"><a href="#" className="brand"><span><RiApps2Line size={20} /></span>arch<i>gui</i>.catalog</a><nav><a href="#directory">Directory</a><a href="#about">About</a><a href="#submit">Submit an app</a></nav><div className="actions"><button className="icon-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">{theme === "dark" ? <RiSunLine size={iconSize} /> : <RiMoonLine size={iconSize} />}</button><a className="primary small" href="#directory"><RiSearchLine size={16} />Browse apps</a></div></div></header>
    <section className="hero"><div className="glow one" /><div className="glow two" /><div className="shell hero-inner"><div className="eyebrow"><i />{apps.length} apps catalogued · updated weekly</div><h1>The GUI apps<span>Arch users actually run.</span></h1><p>A hand-picked, tested catalog of graphical software for Arch-based distributions. Every entry links to its source repo, lists its key features, system requirements, and the distros it&apos;s been verified on.</p><div className="search"><label><RiSearchLine size={18} /><input type="search" aria-label="Search apps" placeholder="Search apps, features, distros…" value={query} onChange={(event) => setQuery(event.target.value)} /></label><button onClick={() => setSort(sort === "stars" ? "name" : "stars")}><RiSortDesc size={18} />{sort === "stars" ? "Stars" : "A-Z"}</button></div><div className="stats"><span><RiBox3Line size={17} />8 apps</span><span><RiGitRepositoryLine size={17} />6 categories</span><span><RiGlobalLine size={17} />8 distros covered</span><span><RiVerifiedBadgeLine size={17} />CI-tested</span></div></div></section>
    <section id="directory" className="directory"><div className="shell"><div className="filters">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>{filtered.length ? <div className="grid">{filtered.map((app) => <AppCard app={app} key={app.name} />)}</div> : <div className="empty"><span><RiSearchEyeLine size={27} /></span><p>No apps match “{query}”. Try a different term or category.</p><button onClick={() => { setQuery(""); setCategory("All"); }}><RiRefreshLine size={16} />Clear filters</button></div>}</div></section>
    <section id="about" className="about shell">{[[RiGitMergeLine, "Source-first", "Every listing links straight to its upstream repository. We don't repackage or rebrand - you always audit the original code."], [RiFlaskLine, "Actually tested", "Each app is installed and smoke-tested in real VMs across Arch, Manjaro, EndeavourOS and friends before we mark a distro as supported."], [RiFileList3Line, "Plain requirements", "Memory, disk, toolkit and dependencies listed upfront, so you know what you're installing before the package manager does."]].map(([Icon, title, copy]) => { const AboutIcon = Icon as typeof RiGitMergeLine; return <article key={title as string}><span><AboutIcon size={20} /></span><h3>{title as string}</h3><p>{copy as string}</p></article>; })}</section>
    <section id="submit" className="submit"><div className="shell"><code>{"// contribute"}</code><h2>Know a great GUI we missed?</h2><p>Open an issue or pull request with the app&apos;s repo, a screenshot, and the distros you&apos;ve tested it on. We&apos;ll verify it and add it to the catalog.</p><div><a className="primary" href="https://github.com/archgui/catalog"><RiGitPullRequestLine size={19} />Submit on GitHub</a><a className="secondary" href="https://github.com/archgui/catalog/issues"><RiDiscussLine size={19} />Open an issue</a></div></div></section>
    <footer><div className="shell"><span className="footer-brand"><i><RiApps2Line size={15} /></i>archgui.catalog · not affiliated with Arch Linux</span><nav><a href="#directory">apps</a><a href="#about">about</a><a href="#submit">submit</a><a href="https://github.com/archgui/catalog">github</a></nav><span>all apps © their respective owners</span></div></footer>
  </main>;
}
