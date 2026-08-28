export type CatalogApp = {
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  requirements: [string, string][];
  distros: [string, "Stable" | "Beta" | "Experimental"][];
  repo: string;
  license: string;
  stars: number | null;
};

export const apps: CatalogApp[] = [
  {
    name: "Pamac", tagline: "The GUI package manager Manjaro ships", category: "Package Manager",
    description: "Pamac is a fast, modern frontend for pacman, AUR, Flatpak and Snap. Browse, search, update and manage all your software from one clean interface with tray notifications for updates.",
    features: ["Unified pacman + AUR + Flatpak + Snap search", "One-click system updates with downgrade support", "Dependency graphs and package file lists", "Native system tray with update alerts"],
    requirements: [["Memory", "256 MB min"], ["Disk", "90 MB"], ["Toolkit", "GTK 4"], ["Backend", "libpamac"]],
    distros: [["Manjaro", "Stable"], ["Arch Linux", "Stable"], ["EndeavourOS", "Stable"], ["Garuda", "Stable"]],
    repo: "https://gitlab.manjaro.org/applications/pamac", license: "GPL-3.0", stars: 580,
  },
  {
    name: "bauh", tagline: "One manager for pacman, AUR, Flatpak and Snap", category: "Package Manager",
    description: "bauh brings every packaging format under one roof. Manage updates, downgrades, orphaned packages and tray notifications across pacman, AUR, Flatpak, Snap and AppImage without touching a terminal.",
    features: ["Multi-format: pacman, AUR, Flatpak, Snap, AppImage", "Automated updates with scheduling", "Package history and rollback", "Lightweight daemon with tray icon"],
    requirements: [["Memory", "300 MB min"], ["Disk", "120 MB"], ["Toolkit", "Qt 5 / GTK 3"], ["Deps", "python3, snapd (optional)"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["ArcoLinux", "Stable"], ["Artix", "Beta"]],
    repo: "https://github.com/vinifmor/bauh", license: "ZLIB", stars: 1200,
  },
  {
    name: "Octopi", tagline: "A powerful Qt frontend for pacman", category: "Package Manager",
    description: "Octopi is a mature Qt-based package manager for Arch. It offers detailed package info, repository filtering, system upgrade checks, and a built-in cache cleaner with a terminal output pane.",
    features: ["Full pacman and AUR (via yaourt/yay) support", "Package groups and repository filters", "Cache cleaner and orphan finder", "Built-in terminal output for every action"],
    requirements: [["Memory", "200 MB min"], ["Disk", "80 MB"], ["Toolkit", "Qt 5 / Qt 6"], ["Backend", "libalpm"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["EndeavourOS", "Stable"]],
    repo: "https://github.com/aarnt/octopi", license: "GPL-2.0", stars: 950,
  },
  {
    name: "Stacer", tagline: "System optimizer and monitoring dashboard", category: "System",
    description: "Stacer is an all-in-one system optimizer and monitor. View CPU, memory and disk in real time, clean caches, manage startup apps, services and uninstall packages from a friendly dashboard.",
    features: ["Real-time CPU, RAM, disk and network graphs", "One-click cache, log and trash cleaner", "Startup application and service manager", "Package and app uninstaller"],
    requirements: [["Memory", "200 MB min"], ["Disk", "100 MB"], ["Toolkit", "Qt 5"], ["Deps", "systemd"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["Garuda", "Stable"], ["CachyOS", "Beta"]],
    repo: "https://github.com/oguzhaninan/Stacer", license: "GPL-3.0", stars: 9100,
  },
  {
    name: "TLPUI", tagline: "A graphical frontend for TLP power saving", category: "Power",
    description: "TLPUI exposes every TLP knob through a simple Qt interface. Tune battery thresholds, CPU governor, USB autosuspend and radio devices to squeeze maximum battery life out of your laptop.",
    features: ["Full TLP configuration via GUI", "Battery charge threshold control", "CPU governor and boost toggles", "Config validation and rollback"],
    requirements: [["Memory", "100 MB min"], ["Disk", "40 MB"], ["Toolkit", "Qt 5"], ["Backend", "tlp"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["EndeavourOS", "Stable"]],
    repo: "https://github.com/d4nj1/TLPUI", license: "GPL-2.0", stars: 1100,
  },
  {
    name: "Timeshift", tagline: "System restore with Btrfs and Rsync snapshots", category: "Recovery",
    description: "Timeshift is the go-to system restore tool for Arch. It takes incremental snapshots of your system so you can roll back a broken upgrade in minutes - without touching your home directory.",
    features: ["Btrfs and rsync snapshot modes", "Scheduled automatic snapshots", "Boot-time restore from a live environment", "Per-snapshot file browsing and restore"],
    requirements: [["Memory", "150 MB min"], ["Disk", "50 MB"], ["Toolkit", "GTK 3"], ["Deps", "btrfs-progs (optional)"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["Garuda", "Stable"], ["EndeavourOS", "Stable"]],
    repo: "https://github.com/linuxmint/timeshift", license: "GPL-3.0", stars: 3400,
  },
  {
    name: "Grub Customizer", tagline: "A GUI editor for your GRUB bootloader", category: "Boot",
    description: "Grub Customizer lets you reorder boot entries, set a default OS, change the timeout, edit kernel parameters and tweak the menu theme without editing grub.cfg by hand.",
    features: ["Drag-and-drop boot entry ordering", "Default OS and timeout configuration", "Kernel parameter editor", "Theme and background customization"],
    requirements: [["Memory", "100 MB min"], ["Disk", "30 MB"], ["Toolkit", "GTK 3"], ["Deps", "grub, gksu/polkit"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["ArcoLinux", "Stable"]],
    repo: "https://launchpad.net/grub-customizer", license: "GPL-3.0", stars: null,
  },
  {
    name: "Discover", tagline: "KDE Plasma's native software center", category: "Desktop",
    description: "Discover is the software center for KDE Plasma. It unifies Flatpak, Snap and your distro repositories into a polished store-like experience with ratings, reviews and automatic update checks.",
    features: ["Unified Flatpak, Snap and repo browsing", "Ratings, reviews and screenshots", "Automatic update notifications", "Deep KDE Plasma integration"],
    requirements: [["Memory", "300 MB min"], ["Disk", "150 MB"], ["Toolkit", "Qt 6 / Kirigami"], ["Deps", "PackageKit, Flatpak"]],
    distros: [["Arch Linux", "Stable"], ["Manjaro", "Stable"], ["EndeavourOS", "Stable"], ["CachyOS", "Stable"]],
    repo: "https://invent.kde.org/plasma/discover", license: "GPL-2.0", stars: null,
  },
];

export const categories = ["All", "Package Manager", "System", "Power", "Recovery", "Boot", "Desktop"];
