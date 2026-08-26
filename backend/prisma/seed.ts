import "dotenv/config";
import { createDatabase } from "../src/database.js";
import { PrismaCatalogRepository } from "../src/prisma-catalog-repository.js";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required");

const database = createDatabase(databaseUrl);
const repository = new PrismaCatalogRepository(database);

const pamac = {
  slug: "pamac",
  name: "Pamac",
  tagline: "The GUI package manager Manjaro ships",
  category: "Package Manager",
  description: "Pamac is a modern frontend for pacman, AUR, Flatpak and Snap.",
  repositoryUrl: "https://gitlab.manjaro.org/applications/pamac",
  license: "GPL-3.0",
  starCount: 580,
  imageUrl: "https://readdy.ai/api/search-image?query=dark%20Linux%20package%20manager&width=1200&height=750",
  features: ["Unified pacman, AUR, Flatpak and Snap search", "One-click system updates"],
  requirements: [
    { label: "Memory", value: "256 MB min" },
    { label: "Toolkit", value: "GTK 4" },
  ],
  distributions: [
    { name: "Manjaro", status: "STABLE" as const },
    { name: "Arch Linux", status: "STABLE" as const },
  ],
};

try {
  const existing = await repository.findBySlug(pamac.slug);
  if (existing) await repository.update(pamac.slug, pamac);
  else await repository.create(pamac);
} finally {
  await database.$disconnect();
}
