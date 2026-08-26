import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import type { CatalogApp, CatalogAppInput, CatalogRepository } from "../src/catalog.js";

const pamac: CatalogApp = {
  id: "app-1",
  slug: "pamac",
  name: "Pamac",
  tagline: "A package manager",
  category: "Package Manager",
  description: "Manage software from a graphical interface.",
  repositoryUrl: "https://gitlab.manjaro.org/applications/pamac",
  license: "GPL-3.0",
  starCount: 580,
  imageUrl: "https://example.com/pamac.png",
  features: [{ id: "feature-1", text: "AUR support", position: 0 }],
  requirements: [{ id: "requirement-1", label: "Memory", value: "256 MB", position: 0 }],
  distributions: [{ id: "support-1", name: "Arch Linux", status: "STABLE" }],
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-01T00:00:00.000Z"),
};

function repository(overrides: Partial<CatalogRepository> = {}): CatalogRepository {
  return {
    list: async () => [pamac],
    findBySlug: async () => pamac,
    create: async () => pamac,
    update: async () => pamac,
    delete: async () => true,
    ...overrides,
  };
}

describe("catalog API", () => {
  it("reports service health", async () => {
    const response = await request(createApp(repository())).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("passes catalog filters to the repository", async () => {
    let receivedFilters: unknown;
    const app = createApp(repository({ list: async (filters) => {
      receivedFilters = filters;
      return [pamac];
    } }));

    const response = await request(app).get("/api/apps?category=Package%20Manager&q=aur");

    expect(response.status).toBe(200);
    expect(receivedFilters).toEqual({ category: "Package Manager", query: "aur" });
    expect(response.body.data[0]).toMatchObject({ slug: "pamac", starCount: 580 });
  });

  it("creates a catalog app from nested frontend data", async () => {
    let receivedInput: CatalogAppInput | undefined;
    const app = createApp(repository({ create: async (input) => {
      receivedInput = input;
      return pamac;
    } }));

    const response = await request(app).post("/api/apps").send({
      slug: "pamac",
      name: "Pamac",
      tagline: "A package manager",
      category: "Package Manager",
      description: "Manage software from a graphical interface.",
      repositoryUrl: "https://gitlab.manjaro.org/applications/pamac",
      license: "GPL-3.0",
      starCount: 580,
      imageUrl: "https://example.com/pamac.png",
      features: ["AUR support"],
      requirements: [{ label: "Memory", value: "256 MB" }],
      distributions: [{ name: "Arch Linux", status: "STABLE" }],
    });

    expect(response.status).toBe(201);
    expect(receivedInput?.features).toEqual(["AUR support"]);
    expect(response.body.data.slug).toBe("pamac");
  });

  it("rejects malformed app data", async () => {
    const response = await request(createApp(repository())).post("/api/apps").send({ name: "" });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });

  it("returns 404 for an unknown slug", async () => {
    const app = createApp(repository({ findBySlug: async () => null }));

    const response = await request(app).get("/api/apps/missing");

    expect(response.status).toBe(404);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });
});
