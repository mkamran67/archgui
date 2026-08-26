import { describe, expect, it, vi } from "vitest";
import { PrismaCatalogRepository } from "../src/prisma-catalog-repository.js";
import type { CatalogAppInput } from "../src/catalog.js";

const input: CatalogAppInput = {
  slug: "pamac",
  name: "Pamac",
  tagline: "A package manager",
  category: "Package Manager",
  description: "Manage software from a graphical interface.",
  repositoryUrl: "https://gitlab.manjaro.org/applications/pamac",
  license: "GPL-3.0",
  starCount: 580,
  imageUrl: "https://example.com/pamac.png",
  features: ["AUR support", "Updates"],
  requirements: [{ label: "Memory", value: "256 MB" }],
  distributions: [{ name: "Arch Linux", status: "STABLE" }],
};

describe("PrismaCatalogRepository", () => {
  it("maps nested app data into an atomic Prisma create", async () => {
    const create = vi.fn().mockResolvedValue({ distributions: [] });
    const repository = new PrismaCatalogRepository({ app: { create } } as never);

    await repository.create(input);

    expect(create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        slug: "pamac",
        features: { create: [{ text: "AUR support", position: 0 }, { text: "Updates", position: 1 }] },
        requirements: { create: [{ label: "Memory", value: "256 MB", position: 0 }] },
        distributions: { create: [{ distribution: { connectOrCreate: {
          where: { name: "Arch Linux" },
          create: { name: "Arch Linux" },
        } }, status: "STABLE" }] },
      }),
      include: expect.any(Object),
    });
  });

  it("searches scalar and related catalog fields", async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    const repository = new PrismaCatalogRepository({ app: { findMany } } as never);

    await repository.list({ category: "System", query: "arch" });

    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        category: "System",
        OR: expect.arrayContaining([
          { name: { contains: "arch", mode: "insensitive" } },
          { distributions: { some: { distribution: { name: { contains: "arch", mode: "insensitive" } } } } },
        ]),
      },
    }));
  });
});
