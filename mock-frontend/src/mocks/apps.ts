export type GuiApp = {
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  requirements: { label: string; value: string }[];
  distros: { name: string; status: "Stable" | "Beta" | "Experimental" }[];
  repo: string;
  license: string;
  stars: string;
  image: string;
};

export const apps: GuiApp[] = [
  {
    name: "Pamac",
    tagline: "The GUI package manager Manjaro ships",
    category: "Package Manager",
    description:
      "Pamac is a fast, modern frontend for pacman, AUR, Flatpak and Snap. Browse, search, update and manage all your software from one clean interface with tray notifications for updates.",
    features: [
      "Unified pacman + AUR + Flatpak + Snap search",
      "One-click system updates with downgrade support",
      "Dependency graphs and package file lists",
      "Native system tray with update alerts",
    ],
    requirements: [
      { label: "Memory", value: "256 MB min" },
      { label: "Disk", value: "90 MB" },
      { label: "Toolkit", value: "GTK 4" },
      { label: "Backend", value: "libpamac" },
    ],
    distros: [
      { name: "Manjaro", status: "Stable" },
      { name: "Arch Linux", status: "Stable" },
      { name: "EndeavourOS", status: "Stable" },
      { name: "Garuda", status: "Stable" },
    ],
    repo: "https://gitlab.manjaro.org/applications/pamac",
    license: "GPL-3.0",
    stars: "580",
    image: "https://readdy.ai/api/search-image?query=dark%20themed%20Linux%20package%20manager%20desktop%20application%20interface%20with%20a%20left%20sidebar%20category%20list%20and%20a%20main%20software%20package%20list%20with%20search%20bar%20and%20install%20buttons%2C%20green%20accent%20color%2C%20clean%20flat%20UI%2C%20dark%20background%20screenshot&width=1200&height=750&seq=pamac-screenshot&orientation=landscape",
  },
  {
    name: "bauh",
    tagline: "One manager for pacman, AUR, Flatpak and Snap",
    category: "Package Manager",
    description:
      "bauh brings every packaging format under one roof. Manage updates, downgrades, orphaned packages and tray notifications across pacman, AUR, Flatpak, Snap and AppImage without touching a terminal.",
    features: [
      "Multi-format: pacman, AUR, Flatpak, Snap, AppImage",
      "Automated updates with scheduling",
      "Package history and rollback",
      "Lightweight daemon with tray icon",
    ],
    requirements: [
      { label: "Memory", value: "300 MB min" },
      { label: "Disk", value: "120 MB" },
      { label: "Toolkit", value: "Qt 5 / GTK 3" },
      { label: "Deps", value: "python3, snapd (optional)" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "ArcoLinux", status: "Stable" },
      { name: "Artix", status: "Beta" },
    ],
    repo: "https://github.com/vinifmor/bauh",
    license: "ZLIB",
    stars: "1.2k",
    image: "https://readdy.ai/api/search-image?query=dark%20modern%20Linux%20application%20store%20window%20with%20tabs%20for%20pacman%20flatpak%20and%20snap%20at%20the%20top%2C%20a%20grid%20of%20software%20app%20cards%20with%20icons%20and%20update%20badges%2C%20blue%20green%20accents%2C%20flat%20minimal%20dark%20UI%20screenshot&width=1200&height=750&seq=bauh-screenshot&orientation=landscape",
  },
  {
    name: "Octopi",
    tagline: "A powerful Qt frontend for pacman",
    category: "Package Manager",
    description:
      "Octopi is a mature Qt-based package manager for Arch. It offers detailed package info, repository filtering, system upgrade checks, and a built-in cache cleaner with a terminal output pane.",
    features: [
      "Full pacman and AUR (via yaourt/yay) support",
      "Package groups and repository filters",
      "Cache cleaner and orphan finder",
      "Built-in terminal output for every action",
    ],
    requirements: [
      { label: "Memory", value: "200 MB min" },
      { label: "Disk", value: "80 MB" },
      { label: "Toolkit", value: "Qt 5 / Qt 6" },
      { label: "Backend", value: "libalpm" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "EndeavourOS", status: "Stable" },
    ],
    repo: "https://github.com/aarnt/octopi",
    license: "GPL-2.0",
    stars: "950",
    image: "https://readdy.ai/api/search-image?query=Qt%20desktop%20application%20package%20manager%20with%20toolbar%20icons%20and%20a%20dense%20table%20of%20software%20packages%20with%20version%20columns%20and%20checkbox%20selection%2C%20blue%20accent%20buttons%2C%20classic%20dark%20desktop%20UI%20screenshot&width=1200&height=750&seq=octopi-screenshot&orientation=landscape",
  },
  {
    name: "Stacer",
    tagline: "System optimizer and monitoring dashboard",
    category: "System",
    description:
      "Stacer is an all-in-one system optimizer and monitor. View CPU, memory and disk in real time, clean caches, manage startup apps, services and uninstall packages from a friendly dashboard.",
    features: [
      "Real-time CPU, RAM, disk and network graphs",
      "One-click cache, log and trash cleaner",
      "Startup application and service manager",
      "Package and app uninstaller",
    ],
    requirements: [
      { label: "Memory", value: "200 MB min" },
      { label: "Disk", value: "100 MB" },
      { label: "Toolkit", value: "Qt 5" },
      { label: "Deps", value: "systemd" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "Garuda", status: "Stable" },
      { name: "CachyOS", status: "Beta" },
    ],
    repo: "https://github.com/oguzhaninan/Stacer",
    license: "GPL-3.0",
    stars: "9.1k",
    image: "https://readdy.ai/api/search-image?query=system%20monitor%20dashboard%20desktop%20application%20with%20large%20circular%20CPU%20and%20memory%20gauges%20and%20line%20graphs%20for%20disk%20and%20network%20activity%2C%20orange%20and%20green%20accents%2C%20clean%20dark%20flat%20UI%20screenshot&width=1200&height=750&seq=stacer-screenshot&orientation=landscape",
  },
  {
    name: "TLPUI",
    tagline: "A graphical frontend for TLP power saving",
    category: "Power",
    description:
      "TLPUI exposes every TLP knob through a simple Qt interface. Tune battery thresholds, CPU governor, USB autosuspend and radio devices to squeeze maximum battery life out of your laptop.",
    features: [
      "Full TLP configuration via GUI",
      "Battery charge threshold control",
      "CPU governor and boost toggles",
      "Config validation and rollback",
    ],
    requirements: [
      { label: "Memory", value: "100 MB min" },
      { label: "Disk", value: "40 MB" },
      { label: "Toolkit", value: "Qt 5" },
      { label: "Backend", value: "tlp" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "EndeavourOS", status: "Stable" },
    ],
    repo: "https://github.com/d4nj1/TLPUI",
    license: "GPL-2.0",
    stars: "1.1k",
    image: "https://readdy.ai/api/search-image?query=battery%20power%20management%20settings%20application%20with%20toggle%20switches%20and%20sliders%20for%20CPU%20governor%20and%20battery%20thresholds%2C%20green%20toggle%20accents%2C%20minimal%20dark%20Linux%20desktop%20UI%20screenshot&width=1200&height=750&seq=tlpui-screenshot&orientation=landscape",
  },
  {
    name: "Timeshift",
    tagline: "System restore with Btrfs and Rsync snapshots",
    category: "Recovery",
    description:
      "Timeshift is the go-to system restore tool for Arch. It takes incremental snapshots of your system so you can roll back a broken upgrade in minutes — without touching your home directory.",
    features: [
      "Btrfs and rsync snapshot modes",
      "Scheduled automatic snapshots",
      "Boot-time restore from a live environment",
      "Per-snapshot file browsing and restore",
    ],
    requirements: [
      { label: "Memory", value: "150 MB min" },
      { label: "Disk", value: "50 MB" },
      { label: "Toolkit", value: "GTK 3" },
      { label: "Deps", value: "btrfs-progs (optional)" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "Garuda", status: "Stable" },
      { name: "EndeavourOS", status: "Stable" },
    ],
    repo: "https://github.com/linuxmint/timeshift",
    license: "GPL-3.0",
    stars: "3.4k",
    image: "https://readdy.ai/api/search-image?query=system%20backup%20snapshot%20application%20showing%20a%20list%20of%20dated%20snapshots%20with%20create%20and%20restore%20buttons%20and%20a%20calendar%20on%20the%20side%2C%20green%20and%20teal%20accents%2C%20clean%20dark%20Linux%20desktop%20UI%20screenshot&width=1200&height=750&seq=timeshift-screenshot&orientation=landscape",
  },
  {
    name: "Grub Customizer",
    tagline: "A GUI editor for your GRUB bootloader",
    category: "Boot",
    description:
      "Grub Customizer lets you reorder boot entries, set a default OS, change the timeout, edit kernel parameters and tweak the menu theme — all without hand-editing grub.cfg by hand.",
    features: [
      "Drag-and-drop boot entry ordering",
      "Default OS and timeout configuration",
      "Kernel parameter editor",
      "Theme and background customization",
    ],
    requirements: [
      { label: "Memory", value: "100 MB min" },
      { label: "Disk", value: "30 MB" },
      { label: "Toolkit", value: "GTK 3" },
      { label: "Deps", value: "grub, gksu/polkit" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "ArcoLinux", status: "Stable" },
    ],
    repo: "https://launchpad.net/grub-customizer",
    license: "GPL-3.0",
    stars: "—",
    image: "https://readdy.ai/api/search-image?query=bootloader%20configuration%20application%20with%20a%20list%20of%20operating%20system%20boot%20entries%20with%20up%20and%20down%20arrow%20buttons%20and%20checkboxes%2C%20warm%20orange%20accents%2C%20minimal%20dark%20Linux%20desktop%20UI%20screenshot&width=1200&height=750&seq=grub-customizer-screenshot&orientation=landscape",
  },
  {
    name: "Discover",
    tagline: "KDE Plasma's native software center",
    category: "Desktop",
    description:
      "Discover is the software center for KDE Plasma. It unifies Flatpak, Snap and your distro repositories into a polished store-like experience with ratings, reviews and automatic update checks.",
    features: [
      "Unified Flatpak, Snap and repo browsing",
      "Ratings, reviews and screenshots",
      "Automatic update notifications",
      "Deep KDE Plasma integration",
    ],
    requirements: [
      { label: "Memory", value: "300 MB min" },
      { label: "Disk", value: "150 MB" },
      { label: "Toolkit", value: "Qt 6 / Kirigami" },
      { label: "Deps", value: "PackageKit, Flatpak" },
    ],
    distros: [
      { name: "Arch Linux", status: "Stable" },
      { name: "Manjaro", status: "Stable" },
      { name: "EndeavourOS", status: "Stable" },
      { name: "CachyOS", status: "Stable" },
    ],
    repo: "https://invent.kde.org/plasma/discover",
    license: "GPL-2.0",
    stars: "—",
    image: "https://readdy.ai/api/search-image?query=modern%20software%20center%20app%20store%20with%20colorful%20featured%20app%20banners%20and%20a%20grid%20of%20rounded%20app%20cards%20with%20icons%20and%20ratings%2C%20teal%20and%20blue%20accents%2C%20clean%20flat%20dark%20KDE%20UI%20screenshot&width=1200&height=750&seq=discover-screenshot&orientation=landscape",
  },
];

export const categories = [
  "All",
  "Package Manager",
  "System",
  "Power",
  "Recovery",
  "Boot",
  "Desktop",
];